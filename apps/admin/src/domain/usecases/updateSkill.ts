import { skillRepository } from '../../data/repositories';
import type { SkillMutationResponse, UpdateSkillRequest } from 'shared-types';

export class UpdateSkillUseCase {
  async execute(id: number, data: UpdateSkillRequest): Promise<SkillMutationResponse> {
    return skillRepository.updateSkill(id, data);
  }
}

export const updateSkillUseCase = new UpdateSkillUseCase();
