import { publicProjectService } from 'shared-api';
import type { ProjectQueryParams } from 'shared-types';
import type { Project, ProjectsListData } from '../../domain/entities';

/**
 * Project Repository - handles project data operations via public API
 */
export class ProjectRepository {
  async getProjects(params?: ProjectQueryParams): Promise<ProjectsListData> {
    const response = await publicProjectService.getProjects(params);
    return {
      data: response.data as Project[],
      pagination: response.pagination,
    };
  }

  async getProjectById(id: number): Promise<Project> {
    const response = await publicProjectService.getProjectById(id);
    return response.data as Project;
  }
}

export const projectRepository = new ProjectRepository();
