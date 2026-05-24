import { adminUserRepository } from '../../data/repositories';
import type { AdminUserMutationResponse, UpdateAdminUserRequest } from 'shared-types';

export class UpdateAdminUserUseCase {
  async execute(id: number, data: UpdateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return adminUserRepository.updateUser(id, data);
  }
}

export const updateAdminUserUseCase = new UpdateAdminUserUseCase();
