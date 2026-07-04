import { strengthRepository } from '../../data/repositories';
import type { StrengthDetailResponse } from 'shared-types';

export class GetStrengthByIdUseCase {
  async execute(id: number): Promise<StrengthDetailResponse> {
    return strengthRepository.getStrengthById(id);
  }
}

export const getStrengthByIdUseCase = new GetStrengthByIdUseCase();
