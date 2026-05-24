import { adminUserRepository } from '../../data/repositories';
import type { AdminUserDetailResponse } from 'shared-types';

export class GetAdminUserByIdUseCase {
  async execute(id: number): Promise<AdminUserDetailResponse> {
    return adminUserRepository.getUserById(id);
  }
}

export const getAdminUserByIdUseCase = new GetAdminUserByIdUseCase();
