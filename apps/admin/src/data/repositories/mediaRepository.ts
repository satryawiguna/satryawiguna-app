import { mediaService } from 'shared-api';
import type { MediaListResponse, MediaQueryParams } from 'shared-types';
import type { UploadMediaResponse } from 'shared-api';

export class MediaRepository {
  async getMediaList(params?: MediaQueryParams): Promise<MediaListResponse> {
    return mediaService.getMediaList(params);
  }

  async uploadMedia(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadMediaResponse> {
    return mediaService.uploadMedia(file, onProgress);
  }

  async deleteMedia(id: string): Promise<void> {
    return mediaService.deleteMedia(id);
  }
}

export const mediaRepository = new MediaRepository();
