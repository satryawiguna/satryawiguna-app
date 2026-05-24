import { projectRepository } from '../../data/repositories';
import type { ProjectMutationResponse, CreateProjectRequest } from 'shared-types';

export class CreateProjectUseCase {
  async execute(data: CreateProjectRequest): Promise<ProjectMutationResponse> {
    return projectRepository.createProject(data);
  }
}

export const createProjectUseCase = new CreateProjectUseCase();
