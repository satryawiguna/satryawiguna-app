import { skillRepository } from '../../data/repositories';
import type { SkillMutationResponse, CreateSkillRequest } from 'shared-types';

export class CreateSkillUseCase {
  async execute(data: CreateSkillRequest): Promise<SkillMutationResponse> {
    return skillRepository.createSkill(data);
  }
}

export const createSkillUseCase = new CreateSkillUseCase();
