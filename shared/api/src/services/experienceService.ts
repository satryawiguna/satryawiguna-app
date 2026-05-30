import { apiClient } from '../client';
import type {
  ExperienceListResponse,
  ExperienceDetailResponse,
  ExperienceMutationResponse,
  ExperienceQueryParams,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from 'shared-types';

export class ExperienceService {
  private readonly basePath = '/admin/experiences';

  async getExperiences(params?: ExperienceQueryParams): Promise<ExperienceListResponse> {
    return apiClient.get<ExperienceListResponse>(this.basePath, { params });
  }

  async getExperienceById(id: number): Promise<ExperienceDetailResponse> {
    return apiClient.get<ExperienceDetailResponse>(`${this.basePath}/${id}`);
  }

  async createExperience(data: CreateExperienceRequest): Promise<ExperienceMutationResponse> {
    return apiClient.post<ExperienceMutationResponse>(this.basePath, data);
  }

  async updateExperience(id: number, data: UpdateExperienceRequest): Promise<ExperienceMutationResponse> {
    return apiClient.put<ExperienceMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteExperience(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const experienceService = new ExperienceService();
