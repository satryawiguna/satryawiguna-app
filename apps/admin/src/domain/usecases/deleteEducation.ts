import { educationRepository } from '../../data/repositories';

export class DeleteEducationUseCase {
  async execute(id: number): Promise<void> {
    return educationRepository.deleteEducation(id);
  }
}

export const deleteEducationUseCase = new DeleteEducationUseCase();
