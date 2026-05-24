import { tagRepository } from '../../data/repositories';
import type { TagMutationResponse, UpdateTagRequest } from 'shared-types';

export class UpdateTagUseCase {
  async execute(id: number, data: UpdateTagRequest): Promise<TagMutationResponse> {
    return tagRepository.updateTag(id, data);
  }
}

export const updateTagUseCase = new UpdateTagUseCase();
