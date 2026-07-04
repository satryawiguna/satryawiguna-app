import { apiClient } from 'shared-api';
import type { Strength } from 'shared-types';

export interface PublicStrengthQueryParams {
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  keyword?: string;
}

export interface PublicStrengthListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Strength[];
  timestamp: string;
}

/**
 * Strength Repository - handles public strength data operations
 */
export class StrengthRepository {
  private readonly basePath = '/strengths';

  async getStrengths(params?: PublicStrengthQueryParams): Promise<Strength[]> {
    const response = await apiClient.get<PublicStrengthListResponse>(this.basePath, {
      params,
    });
    return response.data;
  }
}

export const strengthRepository = new StrengthRepository();
