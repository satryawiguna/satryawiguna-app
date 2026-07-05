import { careerImpactRepository } from '../../data/repositories';
import type { CareerImpactMutationResponse, UpdateCareerImpactRequest } from 'shared-types';

export class UpdateCareerImpactUseCase {
  async execute(
    id: number,
    data: UpdateCareerImpactRequest,
  ): Promise<CareerImpactMutationResponse> {
    return careerImpactRepository.updateCareerImpact(id, data);
  }
}

export const updateCareerImpactUseCase = new UpdateCareerImpactUseCase();
