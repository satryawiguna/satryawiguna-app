import { strengthService } from 'shared-api';
import type {
  StrengthListResponse,
  StrengthDetailResponse,
  StrengthMutationResponse,
  StrengthQueryParams,
  CreateStrengthRequest,
  UpdateStrengthRequest,
} from 'shared-types';

export class StrengthRepository {
  async getStrengths(params?: StrengthQueryParams): Promise<StrengthListResponse> {
    return strengthService.getStrengths(params);
  }

  async getStrengthById(id: number): Promise<StrengthDetailResponse> {
    return strengthService.getStrengthById(id);
  }

  async createStrength(data: CreateStrengthRequest): Promise<StrengthMutationResponse> {
    return strengthService.createStrength(data);
  }

  async updateStrength(id: number, data: UpdateStrengthRequest): Promise<StrengthMutationResponse> {
    return strengthService.updateStrength(id, data);
  }

  async deleteStrength(id: number): Promise<void> {
    return strengthService.deleteStrength(id);
  }
}

export const strengthRepository = new StrengthRepository();
