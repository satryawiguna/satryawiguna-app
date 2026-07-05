import { careerImpactService } from 'shared-api';
import type { CareerImpact } from 'shared-types';

/**
 * CareerImpact Repository - handles public career impact data operations
 */
export class CareerImpactRepository {
  async getCareerImpacts(): Promise<CareerImpact[]> {
    const response = await careerImpactService.getPublicCareerImpacts();
    return response.data;
  }
}

export const careerImpactRepository = new CareerImpactRepository();
