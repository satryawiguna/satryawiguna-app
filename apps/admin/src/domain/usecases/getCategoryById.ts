import { categoryRepository } from '../../data/repositories';
import type { CategoryDetailResponse } from 'shared-types';

export class GetCategoryByIdUseCase {
  async execute(id: number): Promise<CategoryDetailResponse> {
    return categoryRepository.getCategoryById(id);
  }
}

export const getCategoryByIdUseCase = new GetCategoryByIdUseCase();
