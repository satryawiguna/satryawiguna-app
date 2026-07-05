import { strengthRepository } from '../../data/repositories';
import type { StrengthMutationResponse, UpdateStrengthRequest } from 'shared-types';

export class UpdateStrengthUseCase {
  async execute(id: number, data: UpdateStrengthRequest): Promise<StrengthMutationResponse> {
    return strengthRepository.updateStrength(id, data);
  }
}

export const updateStrengthUseCase = new UpdateStrengthUseCase();
