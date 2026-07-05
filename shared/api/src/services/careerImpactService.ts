import { apiClient } from '../client';
import type {
  CareerImpactListResponse,
  CareerImpactDetailResponse,
  CareerImpactMutationResponse,
  CareerImpactQueryParams,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
  CareerImpactPublicListResponse,
} from 'shared-types';

export class CareerImpactService {
  private readonly adminBasePath = '/admin/career-impacts';
  private readonly publicBasePath = '/career-impacts';

  // ── Admin endpoints ──────────────────────────────────────────

  async getCareerImpacts(params?: CareerImpactQueryParams): Promise<CareerImpactListResponse> {
    return apiClient.get<CareerImpactListResponse>(this.adminBasePath, { params });
  }

  async getCareerImpactById(id: number): Promise<CareerImpactDetailResponse> {
    return apiClient.get<CareerImpactDetailResponse>(`${this.adminBasePath}/${id}`);
  }

  async createCareerImpact(data: CreateCareerImpactRequest): Promise<CareerImpactMutationResponse> {
    return apiClient.post<CareerImpactMutationResponse>(this.adminBasePath, data);
  }

  async updateCareerImpact(
    id: number,
    data: UpdateCareerImpactRequest,
  ): Promise<CareerImpactMutationResponse> {
    return apiClient.put<CareerImpactMutationResponse>(`${this.adminBasePath}/${id}`, data);
  }

  async deleteCareerImpact(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.adminBasePath}/${id}`);
  }

  // ── Public endpoints ─────────────────────────────────────────

  async getPublicCareerImpacts(): Promise<CareerImpactPublicListResponse> {
    return apiClient.get<CareerImpactPublicListResponse>(this.publicBasePath);
  }
}

export const careerImpactService = new CareerImpactService();
