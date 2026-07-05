import { apiClient } from '../client';
import type {
  EducationListResponse,
  EducationDetailResponse,
  EducationMutationResponse,
  EducationQueryParams,
  CreateEducationRequest,
  UpdateEducationRequest,
  PublicEducationListResponse,
} from 'shared-types';

export class EducationService {
  private readonly basePath = '/admin/educations';

  async getEducations(params?: EducationQueryParams): Promise<EducationListResponse> {
    return apiClient.get<EducationListResponse>(this.basePath, { params });
  }

  async getEducationById(id: number): Promise<EducationDetailResponse> {
    return apiClient.get<EducationDetailResponse>(`${this.basePath}/${id}`);
  }

  async createEducation(data: CreateEducationRequest): Promise<EducationMutationResponse> {
    return apiClient.post<EducationMutationResponse>(this.basePath, data);
  }

  async updateEducation(
    id: number,
    data: UpdateEducationRequest,
  ): Promise<EducationMutationResponse> {
    return apiClient.put<EducationMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteEducation(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  // ── Public endpoints ─────────────────────────────────────────

  async getPublicEducations(params?: {
    orderBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<PublicEducationListResponse> {
    return apiClient.get<PublicEducationListResponse>('/educations', { params });
  }
}

export const educationService = new EducationService();
