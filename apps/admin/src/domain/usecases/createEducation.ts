import { educationRepository } from '../../data/repositories';
import type { EducationMutationResponse, CreateEducationRequest } from 'shared-types';

export class CreateEducationUseCase {
  async execute(data: CreateEducationRequest): Promise<EducationMutationResponse> {
    return educationRepository.createEducation(data);
  }
}

export const createEducationUseCase = new CreateEducationUseCase();
