import { experienceRepository } from '../../data/repositories';
import type { ExperienceMutationResponse, UpdateExperienceRequest } from 'shared-types';

export class UpdateExperienceUseCase {
  async execute(id: number, data: UpdateExperienceRequest): Promise<ExperienceMutationResponse> {
    return experienceRepository.updateExperience(id, data);
  }
}

export const updateExperienceUseCase = new UpdateExperienceUseCase();
