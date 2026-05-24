import { projectRepository } from '../../data/repositories';
import type { ProjectListResponse, ProjectQueryParams } from 'shared-types';

export class GetProjectsUseCase {
  async execute(params?: ProjectQueryParams): Promise<ProjectListResponse> {
    return projectRepository.getProjects(params);
  }
}

export const getProjectsUseCase = new GetProjectsUseCase();
