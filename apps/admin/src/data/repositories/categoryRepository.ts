import { categoryService } from 'shared-api';
import type {
  CategoryListResponse,
  CategoryDetailResponse,
  CategoryMutationResponse,
  CategoryQueryParams,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'shared-types';

export class CategoryRepository {
  async getCategories(params?: CategoryQueryParams): Promise<CategoryListResponse> {
    return categoryService.getCategories(params);
  }

  async getCategoryById(id: number): Promise<CategoryDetailResponse> {
    return categoryService.getCategoryById(id);
  }

  async createCategory(data: CreateCategoryRequest): Promise<CategoryMutationResponse> {
    return categoryService.createCategory(data);
  }

  async updateCategory(id: number, data: UpdateCategoryRequest): Promise<CategoryMutationResponse> {
    return categoryService.updateCategory(id, data);
  }

  async deleteCategory(id: number): Promise<void> {
    return categoryService.deleteCategory(id);
  }
}

export const categoryRepository = new CategoryRepository();
