import { apiClient } from '../client';
import type {
  SkillListResponse,
  SkillDetailResponse,
  SkillMutationResponse,
  SkillQueryParams,
  CreateSkillRequest,
  UpdateSkillRequest,
  ProjectCategoryOptionListResponse,
} from 'shared-types';

export class SkillService {
  private readonly basePath = '/admin/skills';
  private readonly categoriesPath = '/admin/categories';

  async getSkills(params?: SkillQueryParams): Promise<SkillListResponse> {
    return apiClient.get<SkillListResponse>(this.basePath, { params });
  }

  async getSkillById(id: number): Promise<SkillDetailResponse> {
    return apiClient.get<SkillDetailResponse>(`${this.basePath}/${id}`);
  }

  async createSkill(data: CreateSkillRequest): Promise<SkillMutationResponse> {
    return apiClient.post<SkillMutationResponse>(this.basePath, data);
  }

  async updateSkill(id: number, data: UpdateSkillRequest): Promise<SkillMutationResponse> {
    return apiClient.put<SkillMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteSkill(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async getSkillCategories(keyword?: string): Promise<ProjectCategoryOptionListResponse> {
    return apiClient.get<ProjectCategoryOptionListResponse>(this.categoriesPath, {
      params: { ...(keyword ? { keyword } : {}), type: 'SKILL' },
    });
  }
}

export const skillService = new SkillService();
