import { projectRepository } from '../../data/repositories';
import type { ProjectQueryParams } from 'shared-types';
import type { ProjectsListData } from '../entities';

/**
 * Use case: Get paginated projects list
 */
export class GetProjectsUseCase {
  async execute(params?: ProjectQueryParams): Promise<ProjectsListData> {
    return projectRepository.getProjects(params);
  }
}

export const getProjectsUseCase = new GetProjectsUseCase();
