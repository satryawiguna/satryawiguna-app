import { educationRepository } from '../../data/repositories';
import type { EducationMutationResponse, UpdateEducationRequest } from 'shared-types';

export class UpdateEducationUseCase {
  async execute(id: number, data: UpdateEducationRequest): Promise<EducationMutationResponse> {
    return educationRepository.updateEducation(id, data);
  }
}

export const updateEducationUseCase = new UpdateEducationUseCase();
