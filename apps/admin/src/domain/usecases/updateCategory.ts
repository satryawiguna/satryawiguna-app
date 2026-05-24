import { categoryRepository } from '../../data/repositories';
import type { CategoryMutationResponse, UpdateCategoryRequest } from 'shared-types';

export class UpdateCategoryUseCase {
  async execute(id: number, data: UpdateCategoryRequest): Promise<CategoryMutationResponse> {
    return categoryRepository.updateCategory(id, data);
  }
}

export const updateCategoryUseCase = new UpdateCategoryUseCase();
