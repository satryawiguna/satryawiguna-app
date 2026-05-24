import { blogPostRepository } from '../../data/repositories';
import type { BlogListResponse, BlogQueryParams } from 'shared-types';

export class GetBlogPostsUseCase {
  async execute(params?: BlogQueryParams): Promise<BlogListResponse> {
    return blogPostRepository.getBlogPosts(params);
  }
}

export const getBlogPostsUseCase = new GetBlogPostsUseCase();
