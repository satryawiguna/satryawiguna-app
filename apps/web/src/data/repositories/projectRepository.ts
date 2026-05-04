import { apiClient } from 'shared-api';
import { Project } from '../../domain/entities';

/**
 * Project Repository - handles project data operations
 */
export class ProjectRepository {
  private readonly basePath = '/projects';

  async getProjects(): Promise<Project[]> {
    return apiClient.get<Project[]>(this.basePath);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return apiClient.get<Project[]>(`${this.basePath}/featured`);
  }

  async getProjectById(id: string): Promise<Project> {
    return apiClient.get<Project>(`${this.basePath}/${id}`);
  }
}

export const projectRepository = new ProjectRepository();
