import { educationRepository } from '../../data/repositories';
import type { EducationListResponse, EducationQueryParams } from 'shared-types';

export class GetEducationsUseCase {
  async execute(params?: EducationQueryParams): Promise<EducationListResponse> {
    return educationRepository.getEducations(params);
  }
}

export const getEducationsUseCase = new GetEducationsUseCase();
