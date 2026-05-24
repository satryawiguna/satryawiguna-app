import { apiClient } from '../client';
import type {
  BlogListResponse,
  BlogDetailResponse,
  BlogMutationResponse,
  BlogQueryParams,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  ProjectCategoryOptionListResponse,
  BlogTagOptionListResponse,
} from 'shared-types';

export class BlogPostService {
  private readonly basePath = '/admin/blog-posts';
  private readonly categoriesPath = '/admin/categories';
  private readonly tagsPath = '/admin/tags';

  async getBlogPosts(params?: BlogQueryParams): Promise<BlogListResponse> {
    return apiClient.get<BlogListResponse>(this.basePath, { params });
  }

  async getBlogPostById(id: number): Promise<BlogDetailResponse> {
    return apiClient.get<BlogDetailResponse>(`${this.basePath}/${id}`);
  }

  async createBlogPost(data: CreateBlogPostRequest): Promise<BlogMutationResponse> {
    return apiClient.post<BlogMutationResponse>(this.basePath, data);
  }

  async updateBlogPost(id: number, data: UpdateBlogPostRequest): Promise<BlogMutationResponse> {
    return apiClient.put<BlogMutationResponse>(`${this.basePath}/${id}`, data);
  }

  async deleteBlogPost(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.basePath}/${id}`);
  }

  async getBlogCategories(keyword?: string): Promise<ProjectCategoryOptionListResponse> {
    const params: Record<string, string> = { type: 'BLOG_POST' };
    if (keyword) params.keyword = keyword;
    return apiClient.get<ProjectCategoryOptionListResponse>(this.categoriesPath, { params });
  }

  async getTags(keyword?: string): Promise<BlogTagOptionListResponse> {
    return apiClient.get<BlogTagOptionListResponse>(this.tagsPath, {
      params: keyword ? { keyword } : undefined,
    });
  }
}

export const blogPostService = new BlogPostService();
