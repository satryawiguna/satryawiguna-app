import { careerImpactRepository } from '../../data/repositories';
import type { CareerImpactMutationResponse, CreateCareerImpactRequest } from 'shared-types';

export class CreateCareerImpactUseCase {
  async execute(data: CreateCareerImpactRequest): Promise<CareerImpactMutationResponse> {
    return careerImpactRepository.createCareerImpact(data);
  }
}

export const createCareerImpactUseCase = new CreateCareerImpactUseCase();
