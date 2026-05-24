import { categoryRepository } from '../../data/repositories';
import type { CategoryMutationResponse, CreateCategoryRequest } from 'shared-types';

export class CreateCategoryUseCase {
  async execute(data: CreateCategoryRequest): Promise<CategoryMutationResponse> {
    return categoryRepository.createCategory(data);
  }
}

export const createCategoryUseCase = new CreateCategoryUseCase();
