import { apiClient } from '../client';
import type {
  StrengthListResponse,
  StrengthDetailResponse,
  StrengthMutationResponse,
  StrengthQueryParams,
  CreateStrengthRequest,
  UpdateStrengthRequest,
} from 'shared-types';

export class StrengthService {
  private readonly basePath = '/admin/strengths';

  async getStrengths(params?: StrengthQueryParams): Promise<StrengthListResponse> {
    return apiClient.get<StrengthListResponse>(this.basePath, { params });
  }

  async getStrengthById(id: number): Promise<StrengthDetailResponse> {
    return apiClient.get<StrengthDetailResponse>(`${this.basePath}/${id}`);
  }

  async createStrength(data: CreateStrengthRequest): Promise<StrengthMutationResponse> {
    return apiClient.post<StrengthMutationResponse>(this.basePath, data);
  }

  async updateStrength(id: number, data: UpdateStrengthRequest): Promise<StrengthMutationResponse> {
    return apiClient.put<StrengthMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteStrength(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const strengthService = new StrengthService();
