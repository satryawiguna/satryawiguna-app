import { skillService } from 'shared-api';
import type {
  SkillListResponse,
  SkillDetailResponse,
  SkillMutationResponse,
  SkillQueryParams,
  CreateSkillRequest,
  UpdateSkillRequest,
  ProjectCategoryOptionListResponse,
} from 'shared-types';

export class SkillRepository {
  async getSkills(params?: SkillQueryParams): Promise<SkillListResponse> {
    return skillService.getSkills(params);
  }

  async getSkillById(id: number): Promise<SkillDetailResponse> {
    return skillService.getSkillById(id);
  }

  async createSkill(data: CreateSkillRequest): Promise<SkillMutationResponse> {
    return skillService.createSkill(data);
  }

  async updateSkill(id: number, data: UpdateSkillRequest): Promise<SkillMutationResponse> {
    return skillService.updateSkill(id, data);
  }

  async deleteSkill(id: number): Promise<void> {
    return skillService.deleteSkill(id);
  }

  async getSkillCategories(keyword?: string): Promise<ProjectCategoryOptionListResponse> {
    return skillService.getSkillCategories(keyword);
  }
}

export const skillRepository = new SkillRepository();
