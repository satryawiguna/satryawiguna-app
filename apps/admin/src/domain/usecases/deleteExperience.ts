import { experienceRepository } from '../../data/repositories';

export class DeleteExperienceUseCase {
  async execute(id: number): Promise<void> {
    return experienceRepository.deleteExperience(id);
  }
}

export const deleteExperienceUseCase = new DeleteExperienceUseCase();
