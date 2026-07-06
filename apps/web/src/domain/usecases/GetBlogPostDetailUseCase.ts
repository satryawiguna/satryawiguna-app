import { blogRepository } from '../../data/repositories';
import type { BlogPost } from '../entities';

/**
 * Use case: Get single blog post detail
 */
export class GetBlogPostDetailUseCase {
  async execute(id: number): Promise<BlogPost> {
    return blogRepository.getPostById(id);
  }
}

export const getBlogPostDetailUseCase = new GetBlogPostDetailUseCase();
