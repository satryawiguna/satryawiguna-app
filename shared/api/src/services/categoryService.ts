import { apiClient } from '../client';
import type {
  CategoryListResponse,
  CategoryDetailResponse,
  CategoryMutationResponse,
  CategoryQueryParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'shared-types';

export class CategoryService {
  private readonly basePath = '/admin/categories';

  async getCategories(params?: CategoryQueryParams): Promise<CategoryListResponse> {
    return apiClient.get<CategoryListResponse>(this.basePath, { params });
  }

  async getCategoryById(id: number): Promise<CategoryDetailResponse> {
    return apiClient.get<CategoryDetailResponse>(`${this.basePath}/${id}`);
  }

  async createCategory(data: CreateCategoryRequest): Promise<CategoryMutationResponse> {
    return apiClient.post<CategoryMutationResponse>(this.basePath, data);
  }

  async updateCategory(id: number, data: UpdateCategoryRequest): Promise<CategoryMutationResponse> {
    return apiClient.put<CategoryMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }
}

export const categoryService = new CategoryService();
