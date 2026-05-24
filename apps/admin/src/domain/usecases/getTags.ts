import { tagRepository } from '../../data/repositories';
import type { TagListResponse, TagQueryParams } from 'shared-types';

export class GetTagsUseCase {
  async execute(params?: TagQueryParams): Promise<TagListResponse> {
    return tagRepository.getTags(params);
  }
}

export const getTagsUseCase = new GetTagsUseCase();
