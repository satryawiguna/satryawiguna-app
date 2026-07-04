import { strengthRepository } from '../../data/repositories';
import type { StrengthMutationResponse, CreateStrengthRequest } from 'shared-types';

export class CreateStrengthUseCase {
  async execute(data: CreateStrengthRequest): Promise<StrengthMutationResponse> {
    return strengthRepository.createStrength(data);
  }
}

export const createStrengthUseCase = new CreateStrengthUseCase();
