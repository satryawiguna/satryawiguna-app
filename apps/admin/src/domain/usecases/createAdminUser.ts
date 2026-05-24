import { adminUserRepository } from '../../data/repositories';
import type { AdminUserMutationResponse, CreateAdminUserRequest } from 'shared-types';

export class CreateAdminUserUseCase {
  async execute(data: CreateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return adminUserRepository.createUser(data);
  }
}

export const createAdminUserUseCase = new CreateAdminUserUseCase();
