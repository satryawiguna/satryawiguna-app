'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { mediaRepository } from '../../data/repositories';
import type { Media } from 'shared-types';

export type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadSnapshot {
  state: UploadState;
  progress: number; // 0–100
  file: File | null;
  uploadedMedia: Media | null;
  error: string | null;
}

const INITIAL: UploadSnapshot = {
  state: 'idle',
  progress: 0,
  file: null,
  uploadedMedia: null,
  error: null,
};

export function useMediaUpload(onSuccess?: () => void) {
  const [snapshot, setSnapshot] = useState<UploadSnapshot>(INITIAL);
  const uploadingRef = useRef(false);
  const onSuccessRef = useRef(onSuccess);

  // Keep the callback ref in sync without causing re-renders
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const upload = useCallback(async (file: File) => {
    // Prevent concurrent uploads
    if (uploadingRef.current) return;
    uploadingRef.current = true;

    setSnapshot({
      state: 'uploading',
      progress: 0,
      file,
      uploadedMedia: null,
      error: null,
    });

    try {
      const result = await mediaRepository.uploadMedia(file, (progress) => {
        setSnapshot((prev) => ({ ...prev, progress }));
      });

      setSnapshot({
        state: 'success',
        progress: 100,
        file,
        uploadedMedia: result.data,
        error: null,
      });

      onSuccessRef.current?.();
    } catch (err: any) {
      setSnapshot({
        state: 'error',
        progress: 0,
        file,
        uploadedMedia: null,
        error: err?.message ?? 'Upload failed',
      });
    } finally {
      uploadingRef.current = false;
    }
  }, []); // stable — no dependencies needed thanks to refs

  const reset = useCallback(() => {
    setSnapshot(INITIAL);
  }, []);

  return {
    /** Current upload snapshot */
    snapshot,
    /** Trigger an upload — only one file at a time */
    upload,
    /** Reset back to idle */
    reset,
    /** Whether an upload is in progress */
    isUploading: snapshot.state === 'uploading',
  };
}
