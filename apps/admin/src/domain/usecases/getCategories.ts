import { categoryRepository } from '../../data/repositories';
import type { CategoryListResponse, CategoryQueryParams } from 'shared-types';

export class GetCategoriesUseCase {
  async execute(params?: CategoryQueryParams): Promise<CategoryListResponse> {
    return categoryRepository.getCategories(params);
  }
}

export const getCategoriesUseCase = new GetCategoriesUseCase();
