import { projectRepository } from '../../data/repositories';
import type { ProjectMutationResponse, UpdateProjectRequest } from 'shared-types';

export class UpdateProjectUseCase {
  async execute(id: number, data: UpdateProjectRequest): Promise<ProjectMutationResponse> {
    return projectRepository.updateProject(id, data);
  }
}

export const updateProjectUseCase = new UpdateProjectUseCase();
