import { experienceRepository } from '../../data/repositories';
import type { ExperienceMutationResponse, CreateExperienceRequest } from 'shared-types';

export class CreateExperienceUseCase {
  async execute(data: CreateExperienceRequest): Promise<ExperienceMutationResponse> {
    return experienceRepository.createExperience(data);
  }
}

export const createExperienceUseCase = new CreateExperienceUseCase();
