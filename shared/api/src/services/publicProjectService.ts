import { apiClient } from '../client';
import type {
  ProjectListResponse,
  ProjectDetailResponse,
  ProjectQueryParams,
  SettingResponse,
} from 'shared-types';

export class PublicProjectService {
  private readonly projectsPath = '/projects';
  private readonly settingsPath = '/settings';

  async getProjects(params?: ProjectQueryParams): Promise<ProjectListResponse> {
    return apiClient.get<ProjectListResponse>(this.projectsPath, { params });
  }

  async getProjectById(id: number): Promise<ProjectDetailResponse> {
    return apiClient.get<ProjectDetailResponse>(`${this.projectsPath}/${id}`);
  }

  async getSettingBySlug(slug: string): Promise<SettingResponse> {
    return apiClient.get<SettingResponse>(this.settingsPath, {
      params: { slug },
    });
  }
}

export const publicProjectService = new PublicProjectService();
