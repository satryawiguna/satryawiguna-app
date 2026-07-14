import { apiClient } from 'shared-api';
import type { Category, CategoryQueryParams } from 'shared-types';

export interface PublicCategoryListResponse {
  success: boolean;
  status: number;
  message: string;
  data: Category[];
  timestamp: string;
}

/**
 * Category Repository - handles public category data operations
 */
export class CategoryRepository {
  private readonly basePath = '/categories';

  async getCategories(params?: CategoryQueryParams): Promise<Category[]> {
    const response = await apiClient.get<PublicCategoryListResponse>(this.basePath, {
      params,
    });
    return response.data;
  }
}

export const categoryRepository = new CategoryRepository();
