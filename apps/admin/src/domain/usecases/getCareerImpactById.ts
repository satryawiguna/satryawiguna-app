import { careerImpactRepository } from '../../data/repositories';
import type { CareerImpactDetailResponse } from 'shared-types';

export class GetCareerImpactByIdUseCase {
  async execute(id: number): Promise<CareerImpactDetailResponse> {
    return careerImpactRepository.getCareerImpactById(id);
  }
}

export const getCareerImpactByIdUseCase = new GetCareerImpactByIdUseCase();
