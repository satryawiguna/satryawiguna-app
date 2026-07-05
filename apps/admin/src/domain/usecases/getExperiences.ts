import { experienceRepository } from '../../data/repositories';
import type { ExperienceListResponse, ExperienceQueryParams } from 'shared-types';

export class GetExperiencesUseCase {
  async execute(params?: ExperienceQueryParams): Promise<ExperienceListResponse> {
    return experienceRepository.getExperiences(params);
  }
}

export const getExperiencesUseCase = new GetExperiencesUseCase();
