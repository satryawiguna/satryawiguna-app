import { apiClient } from '../client';
import { User, PaginatedResponse, PaginationParams } from 'shared-types';

export class UserService {
  private readonly basePath = '/users';

  async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    return apiClient.get<PaginatedResponse<User>>(this.basePath, { params });
  }

  async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`${this.basePath}/${id}`);
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return apiClient.post<User>(this.basePath, data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return apiClient.patch<User>(`${this.basePath}/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(`${this.basePath}/me`);
  }
}

export const userService = new UserService();
