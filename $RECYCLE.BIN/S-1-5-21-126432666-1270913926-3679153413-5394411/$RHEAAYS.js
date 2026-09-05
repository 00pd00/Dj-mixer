import Kit from '../worker/uploadkitWorker/models/kit.model.js';

/**
 * DB-backed singleton serial upload queue.
 * Only one kit uploads (queueStatus:'processing') at a time.
 * All others wait in 'queued' state in FIFO order.
 */
class UploadQueueService {
    constructor() {
        this._uploadRunner = null;
    }

    /** Register the function that performs the S3 upload for a kit. Called once on startup. */
    setUploadRunner(fn) { this._uploadRunner = fn; }

    /** Enqueue a kit. Starts immediately if queue is empty, otherwise waits in FIFO. */
    async enqueue(kitId) {
        const activeKit = await Kit.findOne({ queueStatus: 'processing' }).select('_id');

        if (!activeKit) {
            await Kit.findByIdAndUpdate(kitId, {
                queueStatus: 'processing',
                queuePosition: 1,
                uploadStartedAt: new Date()
            });
            this._triggerUpload(kitId);
            return { queuePosition: 1, startedImmediately: true };
        }

        const maxPosnDoc = await Kit.findOne(
            { queueStatus: 'queued', _id: { $ne: kitId } },
            { queuePosition: 1 }
        ).sort({ queuePosition: -1 });
        const queuePosition = maxPosnDoc ? (maxPosnDoc.queuePosition || 1) + 1 : 2;

        await Kit.findByIdAndUpdate(kitId, { queueStatus: 'queued', queuePosition });
        return { queuePosition, startedImmediately: false };
    }

    /** Call when an upload finishes (success or failure) to start the next queued kit. */
    async onUploadDone(_kitId) { await this.startNext(); }

    /** Remove a queued (not yet started) kit from the queue and reorder remaining positions. */
    async removeFromQueue(_kitId) { await this._recalculatePositions(); }

    /** Promote the next queued kit to processing and trigger its upload. */
    async startNext() {
        const nextKit = await Kit.findOne({ queueStatus: 'queued' }).sort({ queuePosition: 1 }).select('_id');
        if (!nextKit) return;
        await Kit.findByIdAndUpdate(nextKit._id, { queueStatus: 'processing', uploadStartedAt: new Date() });
        await this._recalculatePositions();
        this._triggerUpload(nextKit._id.toString());
    }

    /** On startup, reset any stuck 'processing' kits back to queued so they can resume. */
    async recoverOnStartup() {
        const stuck = await Kit.find({ queueStatus: 'processing' }).select('_id kitNumber');
        for (const kit of stuck) {
            console.log(`[QueueService] Recovering stuck upload: kit ${kit._id} (kitNumber: ${kit.kitNumber})`);
            await Kit.findByIdAndUpdate(kit._id, { queueStatus: 'queued', queuePosition: 1, pausedForToken: false });
        }
        if (stuck.length) console.log(`[QueueService] Recovered ${stuck.length} stuck uploads`);
        // Trigger the first queued kit if any
        await this.startNext();
    }

    _triggerUpload(kitId) { setImmediate(() => this._uploadRunner(kitId)); }

    async _recalculatePositions() {
        const queued = await Kit.find({ queueStatus: 'queued' }).sort({ queuePosition: 1 }).select('_id');
        for (let i = 0; i < queued.length; i++) {
            await Kit.findByIdAndUpdate(queued[i]._id, { queuePosition: i + 1 });
        }
    }
}

const uploadQueueService = new UploadQueueService();
export default uploadQueueService;
