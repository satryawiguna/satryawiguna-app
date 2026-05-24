import { apiClient } from '../client';
import type {
  AdminUserListResponse,
  AdminUserDetailResponse,
  AdminUserMutationResponse,
  AdminUserQueryParams,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from 'shared-types';

export class AdminUserService {
  private readonly basePath = '/admin/users';

  async getUsers(params?: AdminUserQueryParams): Promise<AdminUserListResponse> {
    return apiClient.get<AdminUserListResponse>(this.basePath, { params });
  }

  async getUserById(id: number): Promise<AdminUserDetailResponse> {
    return apiClient.get<AdminUserDetailResponse>(`${this.basePath}/${id}`);
  }

  async createUser(data: CreateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return apiClient.post<AdminUserMutationResponse>(this.basePath, data);
  }

  async updateUser(id: number, data: UpdateAdminUserRequest): Promise<AdminUserMutationResponse> {
    return apiClient.put<AdminUserMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const adminUserService = new AdminUserService();
