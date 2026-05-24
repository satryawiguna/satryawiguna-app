import { adminUserService } from 'shared-api';
import type {
  AdminUserListResponse,
  AdminUserDetailResponse,
  AdminUserMutationResponse,
  AdminUserQueryParams,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from 'shared-types';

export class AdminUserRepository {
  async getUsers(params?: AdminUserQueryParams): Promise<AdminUserListResponse> {
    return adminUserService.getUsers(params);
  }

  async getUserById(id: number): Promise<AdminUserDetailResponse> {
    return adminUserService.getUserById(id);
  }

  async createUser(data: CreateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return adminUserService.createUser(data);
  }

  async updateUser(id: number, data: UpdateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return adminUserService.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    return adminUserService.deleteUser(id);
  }
}

export const adminUserRepository = new AdminUserRepository();
