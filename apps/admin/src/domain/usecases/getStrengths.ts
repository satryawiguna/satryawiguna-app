import { strengthRepository } from '../../data/repositories';
import type { StrengthListResponse, StrengthQueryParams } from 'shared-types';

export class GetStrengthsUseCase {
  async execute(params?: StrengthQueryParams): Promise<StrengthListResponse> {
    return strengthRepository.getStrengths(params);
  }
}

export const getStrengthsUseCase = new GetStrengthsUseCase();
