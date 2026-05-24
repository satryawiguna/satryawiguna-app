import { skillRepository } from '../../data/repositories';
import type { SkillListResponse, SkillQueryParams } from 'shared-types';

export class GetSkillsUseCase {
  async execute(params?: SkillQueryParams): Promise<SkillListResponse> {
    return skillRepository.getSkills(params);
  }
}

export const getSkillsUseCase = new GetSkillsUseCase();
