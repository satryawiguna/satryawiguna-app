import { apiClient } from '../client';
import { MediaListResponse, MediaQueryParams, type Media } from 'shared-types';

export interface UploadMediaResponse {
  success: boolean;
  status: number;
  message: string;
  timestamp: string;
  data: Media;
}

export class MediaService {
  private readonly basePath = '/media';

  async getMediaList(params?: MediaQueryParams): Promise<MediaListResponse> {
    return apiClient.get<MediaListResponse>(this.basePath, { params });
  }

  async uploadMedia(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<UploadMediaResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const axios = apiClient.getInstance();
    const response = await axios.post<UploadMediaResponse>(`${this.basePath}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event: { loaded: number; total?: number }) => {
        if (event.total && onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      },
    });

    return response.data;
  }

  async deleteMedia(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export const mediaService = new MediaService();
