import { blogPostRepository } from '../../data/repositories';
import type { BlogDetailResponse } from 'shared-types';

export class GetBlogPostByIdUseCase {
  async execute(id: number): Promise<BlogDetailResponse> {
    return blogPostRepository.getBlogPostById(id);
  }
}

export const getBlogPostByIdUseCase = new GetBlogPostByIdUseCase();
