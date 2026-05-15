import { BlogPost } from '../entities';

/**
 * Use case: Get Published Blog Posts
 */
export class GetPublishedPostsUseCase {
  async execute(_limit?: number): Promise<BlogPost[]> {
    // Business logic here
    return [];
  }
}

export const getPublishedPostsUseCase = new GetPublishedPostsUseCase();
