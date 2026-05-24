import { adminUserRepository } from '../../data/repositories';
import type { AdminUserListResponse, AdminUserQueryParams } from 'shared-types';

export class GetAdminUsersUseCase {
  async execute(params?: AdminUserQueryParams): Promise<AdminUserListResponse> {
    return adminUserRepository.getUsers(params);
  }
}

export const getAdminUsersUseCase = new GetAdminUsersUseCase();
