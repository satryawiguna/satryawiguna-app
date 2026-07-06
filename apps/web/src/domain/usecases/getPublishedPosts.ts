import { blogRepository } from '../../data/repositories';
import type { BlogQueryParams } from 'shared-types';
import type { BlogPost, BlogPagination } from '../entities';

/**
 * Use case: Get paginated blog posts list
 */
export class GetPublishedPostsUseCase {
  async execute(
    params?: BlogQueryParams,
  ): Promise<{ data: BlogPost[]; pagination: BlogPagination }> {
    return blogRepository.getPosts(params);
  }
}

export const getPublishedPostsUseCase = new GetPublishedPostsUseCase();
