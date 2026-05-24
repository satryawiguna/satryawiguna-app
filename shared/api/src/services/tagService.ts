import { apiClient } from '../client';
import type {
  TagListResponse,
  TagDetailResponse,
  TagMutationResponse,
  TagQueryParams,
  CreateTagRequest,
  UpdateTagRequest,
} from 'shared-types';

export class TagService {
  private readonly basePath = '/admin/tags';

  async getTags(params?: TagQueryParams): Promise<TagListResponse> {
    return apiClient.get<TagListResponse>(this.basePath, { params });
  }

  async getTagById(id: number): Promise<TagDetailResponse> {
    return apiClient.get<TagDetailResponse>(`${this.basePath}/${id}`);
  }

  async createTag(data: CreateTagRequest): Promise<TagMutationResponse> {
    return apiClient.post<TagMutationResponse>(this.basePath, data);
  }

  async updateTag(id: number, data: UpdateTagRequest): Promise<TagMutationResponse> {
    return apiClient.put<TagMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteTag(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const tagService = new TagService();
