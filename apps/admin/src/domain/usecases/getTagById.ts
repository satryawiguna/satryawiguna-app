import { tagRepository } from '../../data/repositories';
import type { TagDetailResponse } from 'shared-types';

export class GetTagByIdUseCase {
  async execute(id: number): Promise<TagDetailResponse> {
    return tagRepository.getTagById(id);
  }
}

export const getTagByIdUseCase = new GetTagByIdUseCase();
