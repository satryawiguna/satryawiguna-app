import { categoryRepository } from '../../data/repositories';

export class DeleteCategoryUseCase {
  async execute(id: number): Promise<void> {
    return categoryRepository.deleteCategory(id);
  }
}

export const deleteCategoryUseCase = new DeleteCategoryUseCase();
