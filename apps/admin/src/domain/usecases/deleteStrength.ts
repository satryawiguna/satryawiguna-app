import { strengthRepository } from '../../data/repositories';

export class DeleteStrengthUseCase {
  async execute(id: number): Promise<void> {
    return strengthRepository.deleteStrength(id);
  }
}

export const deleteStrengthUseCase = new DeleteStrengthUseCase();
