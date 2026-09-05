import fs from 'fs';
import path from 'path';

/**
 * Validate that a network/UNC path points to an existing readable .zip file.
 * Returns { valid, fileName, fileSizeBytes, resolvedPath, error }.
 */
export function validateNetworkPath(networkPath) {
    if (!networkPath || typeof networkPath !== 'string') {
        return { valid: false, error: 'Network path is required' };
    }

    const trimmed = networkPath.trim();

    // Must be a UNC path (\\server\share\...) or an absolute path
    if (!path.isAbsolute(trimmed) && !trimmed.startsWith('\\\\')) {
        return { valid: false, error: 'Path must be a full network path (e.g. \\\\server\\share\\file.zip)' };
    }

    if (!trimmed.toLowerCase().endsWith('.zip')) {
        return { valid: false, error: 'Only .zip files are supported' };
    }

    try {
        const stats = fs.statSync(trimmed);
        if (!stats.isFile()) {
            return { valid: false, error: 'Path does not point to a file' };
        }

        return {
            valid: true,
            fileName: path.basename(trimmed).replace(/\s+/g, '').replace(/[^a-zA-Z0-9._-]/g, ''),
            fileSizeBytes: stats.size,
            resolvedPath: trimmed
        };
    } catch (err) {
        if (err.code === 'ENOENT') return { valid: false, error: 'File not found at the given path' };
        if (err.code === 'EACCES') return { valid: false, error: 'Permission denied — cannot read file' };
        return { valid: false, error: `Cannot access path: ${err.message}` };
    }
}
