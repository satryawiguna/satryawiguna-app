import { skillRepository } from '../../data/repositories';
import type { SkillDetailResponse } from 'shared-types';

export class GetSkillByIdUseCase {
  async execute(id: number): Promise<SkillDetailResponse> {
    return skillRepository.getSkillById(id);
  }
}

export const getSkillByIdUseCase = new GetSkillByIdUseCase();
