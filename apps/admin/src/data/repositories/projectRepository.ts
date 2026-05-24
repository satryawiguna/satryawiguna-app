import { projectService } from 'shared-api';
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

export class ProjectRepository {
  async getProjects(params?: ProjectQueryParams): Promise<ProjectListResponse> {
    return projectService.getProjects(params);
  }

  async getProjectById(id: number): Promise<ProjectDetailResponse> {
    return projectService.getProjectById(id);
  }

  async createProject(data: CreateProjectRequest): Promise<ProjectMutationResponse> {
    return projectService.createProject(data);
  }

  async updateProject(id: number, data: UpdateProjectRequest): Promise<ProjectMutationResponse> {
    return projectService.updateProject(id, data);
  }

  async deleteProject(id: number): Promise<void> {
    return projectService.deleteProject(id);
  }

  async getSkills(keyword?: string): Promise<ProjectSkillOptionListResponse> {
    return projectService.getSkills(keyword);
  }

  async getCategories(keyword?: string, type?: string): Promise<ProjectCategoryOptionListResponse> {
    return projectService.getCategories(keyword, type);
  }
}

export const projectRepository = new ProjectRepository();
