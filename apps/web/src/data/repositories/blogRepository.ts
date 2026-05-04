import { apiClient } from 'shared-api';
import { BlogPost } from '../../domain/entities';

/**
 * Blog Repository - handles blog data operations
 */
export class BlogRepository {
  private readonly basePath = '/blog';

  async getPosts(limit?: number): Promise<BlogPost[]> {
    return apiClient.get<BlogPost[]>(this.basePath, {
      params: { limit },
    });
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    return apiClient.get<BlogPost>(`${this.basePath}/${slug}`);
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    return apiClient.get<BlogPost[]>(`${this.basePath}/tags/${tag}`);
  }
}

export const blogRepository = new BlogRepository();
