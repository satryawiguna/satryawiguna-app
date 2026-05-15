import { apiClient } from '../client';
import { MediaListResponse, MediaQueryParams } from 'shared-types';

export class MediaService {
  private readonly basePath = '/media';

  async getMediaList(params?: MediaQueryParams): Promise<MediaListResponse> {
    return apiClient.get<MediaListResponse>(this.basePath, { params });
  }
}

export const mediaService = new MediaService();
