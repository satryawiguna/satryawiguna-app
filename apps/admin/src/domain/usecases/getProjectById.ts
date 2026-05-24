import { projectRepository } from '../../data/repositories';
import type { ProjectDetailResponse } from 'shared-types';

export class GetProjectByIdUseCase {
  async execute(id: number): Promise<ProjectDetailResponse> {
    return projectRepository.getProjectById(id);
  }
}

export const getProjectByIdUseCase = new GetProjectByIdUseCase();
