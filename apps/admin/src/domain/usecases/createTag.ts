import { tagRepository } from '../../data/repositories';
import type { TagMutationResponse, CreateTagRequest } from 'shared-types';

export class CreateTagUseCase {
  async execute(data: CreateTagRequest): Promise<TagMutationResponse> {
    return tagRepository.createTag(data);
  }
}

export const createTagUseCase = new CreateTagUseCase();
