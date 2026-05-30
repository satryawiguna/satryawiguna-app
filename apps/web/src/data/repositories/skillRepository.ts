import { apiClient } from 'shared-api';
import type { Skill } from 'shared-types';

export interface PublicSkillQueryParams {
  sortBy?: string;
  orderBy?: 'asc' | 'desc';
  keyword?: string;
}

export interface PublicSkillListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Skill[];
  timestamp: string;
}

/**
 * Skill Repository - handles public skill data operations
 */
export class SkillRepository {
  private readonly basePath = '/skills';

  async getSkills(params?: PublicSkillQueryParams): Promise<Skill[]> {
    const response = await apiClient.get<PublicSkillListResponse>(this.basePath, {
      params,
    });
    return response.data;
  }
}

export const skillRepository = new SkillRepository();
