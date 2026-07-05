import { careerImpactRepository } from '../../data/repositories';
import type { CareerImpactListResponse, CareerImpactQueryParams } from 'shared-types';

export class GetCareerImpactsUseCase {
  async execute(params?: CareerImpactQueryParams): Promise<CareerImpactListResponse> {
    return careerImpactRepository.getCareerImpacts(params);
  }
}

export const getCareerImpactsUseCase = new GetCareerImpactsUseCase();
