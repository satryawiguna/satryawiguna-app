import { tagService } from 'shared-api';
import type {
  TagListResponse,
  TagDetailResponse,
  TagMutationResponse,
  TagQueryParams,
  CreateTagRequest,
  UpdateTagRequest,
} from 'shared-types';

export class TagRepository {
  async getTags(params?: TagQueryParams): Promise<TagListResponse> {
    return tagService.getTags(params);
  }

  async getTagById(id: number): Promise<TagDetailResponse> {
    return tagService.getTagById(id);
  }

  async createTag(data: CreateTagRequest): Promise<TagMutationResponse> {
    return tagService.createTag(data);
  }

  async updateTag(id: number, data: UpdateTagRequest): Promise<TagMutationResponse> {
    return tagService.updateTag(id, data);
  }

  async deleteTag(id: number): Promise<void> {
    return tagService.deleteTag(id);
  }
}

export const tagRepository = new TagRepository();
