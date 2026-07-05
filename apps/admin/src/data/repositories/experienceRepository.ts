import { experienceService } from 'shared-api';
import type {
  ExperienceListResponse,
  ExperienceDetailResponse,
  ExperienceMutationResponse,
  ExperienceQueryParams,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from 'shared-types';

export class ExperienceRepository {
  async getExperiences(params?: ExperienceQueryParams): Promise<ExperienceListResponse> {
    return experienceService.getExperiences(params);
  }

  async getExperienceById(id: number): Promise<ExperienceDetailResponse> {
    return experienceService.getExperienceById(id);
  }

  async createExperience(data: CreateExperienceRequest): Promise<ExperienceMutationResponse> {
    return experienceService.createExperience(data);
  }

  async updateExperience(id: number, data: UpdateExperienceRequest): Promise<ExperienceMutationResponse> {
    return experienceService.updateExperience(id, data);
  }

  async deleteExperience(id: number): Promise<void> {
    return experienceService.deleteExperience(id);
  }
}

export const experienceRepository = new ExperienceRepository();
