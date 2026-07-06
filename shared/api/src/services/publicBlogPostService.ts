import { apiClient } from '../client';
import type { BlogListResponse, BlogDetailResponse, BlogQueryParams } from 'shared-types';

export class PublicBlogPostService {
  private readonly basePath = '/blog-posts';

  async getBlogPosts(params?: BlogQueryParams): Promise<BlogListResponse> {
    return apiClient.get<BlogListResponse>(this.basePath, { params });
  }

  async getBlogPostById(id: number): Promise<BlogDetailResponse> {
    return apiClient.get<BlogDetailResponse>(`${this.basePath}/${id}`);
  }
}

export const publicBlogPostService = new PublicBlogPostService();
