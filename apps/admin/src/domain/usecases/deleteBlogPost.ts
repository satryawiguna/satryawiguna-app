import { blogPostRepository } from '../../data/repositories';

export class DeleteBlogPostUseCase {
  async execute(id: number): Promise<void> {
    return blogPostRepository.deleteBlogPost(id);
  }
}

export const deleteBlogPostUseCase = new DeleteBlogPostUseCase();
