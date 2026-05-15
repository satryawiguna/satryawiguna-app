import { mediaService, MediaListResponse, MediaQueryParams } from 'shared-api';

export class MediaRepository {
  async getMediaList(params?: MediaQueryParams): Promise<MediaListResponse> {
    return mediaService.getMediaList(params);
  }
}

export const mediaRepository = new MediaRepository();
