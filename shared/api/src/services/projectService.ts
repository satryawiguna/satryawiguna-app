import { apiClient } from '../client';
import type {
  ProjectListResponse,
  ProjectDetailResponse,
  ProjectMutationResponse,
  ProjectQueryParams,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectSkillOptionListResponse,
  ProjectCategoryOptionListResponse,
} from 'shared-types';

export class ProjectService {
  private readonly basePath = '/admin/projects';
  private readonly skillsPath = '/admin/skills';
  private readonly categoriesPath = '/admin/categories';

  async getProjects(params?: ProjectQueryParams): Promise<ProjectListResponse> {
    return apiClient.get<ProjectListResponse>(this.basePath, { params });
  }

  async getProjectById(id: number): Promise<ProjectDetailResponse> {
    return apiClient.get<ProjectDetailResponse>(`${this.basePath}/${id}`);
  }

  async createProject(data: CreateProjectRequest): Promise<ProjectMutationResponse> {
    return apiClient.post<ProjectMutationResponse>(this.basePath, data);
  }

  async updateProject(id: number, data: UpdateProjectRequest): Promise<ProjectMutationResponse> {
    return apiClient.put<ProjectMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteProject(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async getSkills(keyword?: string): Promise<ProjectSkillOptionListResponse> {
    return apiClient.get<ProjectSkillOptionListResponse>(this.skillsPath, {
      params: keyword ? { keyword } : undefined,
    });
  }

  async getCategories(keyword?: string, type?: string): Promise<ProjectCategoryOptionListResponse> {
    const params: Record<string, string> = {};
    if (keyword) params.keyword = keyword;
    if (type) params.type = type;
    return apiClient.get<ProjectCategoryOptionListResponse>(this.categoriesPath, {
      params: Object.keys(params).length ? params : undefined,
    });
  }
}

export const projectService = new ProjectService();
