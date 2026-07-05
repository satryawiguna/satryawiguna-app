import { experienceService } from 'shared-api';
import type { ExperienceDetail } from 'shared-types';

export interface PublicExperienceQueryParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Experience Repository - handles public experience data operations
 */
export class ExperienceRepository {
  private readonly defaultParams: PublicExperienceQueryParams = {
    page: 1,
    limit: 5,
    orderBy: 'sort_order',
    sortOrder: 'desc',
  };

  async getExperiences(params?: Partial<PublicExperienceQueryParams>): Promise<ExperienceDetail[]> {
    const mergedParams = { ...this.defaultParams, ...params };
    const response = await experienceService.getPublicExperiences(mergedParams);
    return response.data;
  }
}

export const experienceRepository = new ExperienceRepository();
