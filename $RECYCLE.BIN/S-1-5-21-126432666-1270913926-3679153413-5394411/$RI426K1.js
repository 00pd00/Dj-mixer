import { CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

// Configurable via env, sensible defaults
const PART_SIZE_BYTES = (parseInt(process.env.UPLOAD_PART_SIZE_MB) || 50) * 1024 * 1024;
const TOKEN_PAUSE_THRESHOLD_MS = (parseInt(process.env.TOKEN_PAUSE_THRESHOLD_MIN) || 47) * 60 * 1000;
const PART_MAX_RETRIES = 3;
const PART_RETRY_DELAY_MS = 2000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Multipart S3 upload with per-part checkpointing, credential rotation support,
 * and per-part retry for transient network errors.
 */
export class SmartMultipartUploadService {
    constructor({ s3Client, bucket, key, filePath, kitId, onPartComplete, onTokenExpiring }) {
        this.s3Client = s3Client;
        this.bucket = bucket;
        this.key = key;
        this.filePath = filePath;
        this.kitId = kitId;
        this.onPartComplete = onPartComplete || (() => {});
        this.onTokenExpiring = onTokenExpiring || (() => {});

        this.uploadId = null;
        this.completedParts = [];
        this.aborted = false;
        this.paused = false;
        this.uploadStartedAt = null;
    }

    /** Start a new multipart upload and return the S3 uploadId */
    async createMultipartUpload() {
        const res = await this.s3Client.send(new CreateMultipartUploadCommand({
            Bucket: this.bucket,
            Key: this.key,
            ContentType: 'application/zip'
        }));
        this.uploadId = res.UploadId;
        this.uploadStartedAt = Date.now();
        return this.uploadId;
    }

    /** Resume an existing multipart upload with fresh credentials */
    resume({ s3Client, uploadId, completedParts }) {
        this.s3Client = s3Client;
        this.uploadId = uploadId;
        this.completedParts = (completedParts || []).map(p => ({
            PartNumber: p.PartNumber || p.partNumber,
            ETag: p.ETag || p.etag,
            size: p.size || 0
        }));
        this.paused = false;
        this.aborted = false;
        this.uploadStartedAt = Date.now();
    }

    /** Upload all remaining parts starting from startFromPart (1-indexed) */
    async uploadParts(startFromPart = 1) {
        const fileSize = fs.statSync(this.filePath).size;
        const totalParts = Math.ceil(fileSize / PART_SIZE_BYTES);

        for (let partNumber = startFromPart; partNumber <= totalParts; partNumber++) {
            if (this.aborted) throw new Error('Upload aborted');

            // Check if token is about to expire
            const elapsed = Date.now() - this.uploadStartedAt;
            if (elapsed >= TOKEN_PAUSE_THRESHOLD_MS) {
                this.paused = true;
                const uploadedBytes = this.completedParts.reduce((s, p) => s + (p.size || 0), 0);
                await this.onTokenExpiring({
                    nextPartNumber: partNumber,
                    totalParts,
                    uploadedBytes,
                    totalBytes: fileSize
                });
                throw new Error('Upload paused for token rotation');
            }

            const start = (partNumber - 1) * PART_SIZE_BYTES;
            const end = Math.min(start + PART_SIZE_BYTES, fileSize) - 1;
            const partSize = end - start + 1;

            // Per-part retry for transient network errors
            let lastErr;
            for (let attempt = 1; attempt <= PART_MAX_RETRIES; attempt++) {
                try {
                    const stream = fs.createReadStream(this.filePath, { start, end });
                    const res = await this.s3Client.send(new UploadPartCommand({
                        Bucket: this.bucket,
                        Key: this.key,
                        UploadId: this.uploadId,
                        PartNumber: partNumber,
                        Body: stream,
                        ContentLength: partSize
                    }));

                    const partInfo = { PartNumber: partNumber, ETag: res.ETag, size: partSize };
                    this.completedParts.push(partInfo);

                    const uploadedBytes = this.completedParts.reduce((s, p) => s + (p.size || 0), 0);
                    await this.onPartComplete({
                        partNumber,
                        etag: res.ETag,
                        size: partSize,
                        uploadedBytes,
                        totalBytes: fileSize,
                        totalParts
                    });
                    lastErr = null;
                    break; // success

                } catch (err) {
                    lastErr = err;
                    const isTransient = /ECONNRESET|ETIMEDOUT|NetworkingError|socket|timeout/i.test(err.message || '');
                    if (isTransient && attempt < PART_MAX_RETRIES) {
                        console.warn(`[SmartMultipart] Part ${partNumber} attempt ${attempt} failed (${err.message}), retrying...`);
                        await sleep(PART_RETRY_DELAY_MS);
                    } else {
                        throw err;
                    }
                }
            }
            if (lastErr) throw lastErr;
        }
    }

    /** Finalize the multipart upload */
    async completeUpload() {
        await this.s3Client.send(new CompleteMultipartUploadCommand({
            Bucket: this.bucket,
            Key: this.key,
            UploadId: this.uploadId,
            MultipartUpload: {
                Parts: this.completedParts.map(p => ({ PartNumber: p.PartNumber, ETag: p.ETag }))
            }
        }));
    }

    /** Abort the multipart upload and clean up on S3 */
    async abort() {
        this.aborted = true;
        try {
            if (this.uploadId) {
                await this.s3Client.send(new AbortMultipartUploadCommand({
                    Bucket: this.bucket,
                    Key: this.key,
                    UploadId: this.uploadId
                }));
            }
        } catch (e) {
            console.warn('[SmartMultipart] Abort cleanup error:', e.message);
        }
    }

    static getTotalParts(fileSizeBytes) { return Math.ceil(fileSizeBytes / PART_SIZE_BYTES); }
}
