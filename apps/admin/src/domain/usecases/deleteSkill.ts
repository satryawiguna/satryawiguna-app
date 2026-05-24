import { skillRepository } from '../../data/repositories';

export class DeleteSkillUseCase {
  async execute(id: number): Promise<void> {
    return skillRepository.deleteSkill(id);
  }
}

export const deleteSkillUseCase = new DeleteSkillUseCase();
