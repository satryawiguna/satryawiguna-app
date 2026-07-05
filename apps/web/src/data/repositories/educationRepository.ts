import { educationService } from 'shared-api';
import type { Education } from 'shared-types';

export interface PublicEducationQueryParams {
  orderBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Education Repository - handles public education data operations
 */
export class EducationRepository {
  private readonly defaultParams: PublicEducationQueryParams = {
    orderBy: 'sort_order',
    sortOrder: 'desc',
  };

  async getEducations(params?: Partial<PublicEducationQueryParams>): Promise<Education[]> {
    const mergedParams = { ...this.defaultParams, ...params };
    const response = await educationService.getPublicEducations(mergedParams);
    return response.data;
  }
}

export const educationRepository = new EducationRepository();
