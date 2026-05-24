import { blogPostService } from 'shared-api';
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

export class BlogPostRepository {
  async getBlogPosts(params?: BlogQueryParams): Promise<BlogListResponse> {
    return blogPostService.getBlogPosts(params);
  }

  async getBlogPostById(id: number): Promise<BlogDetailResponse> {
    return blogPostService.getBlogPostById(id);
  }

  async createBlogPost(data: CreateBlogPostRequest): Promise<BlogMutationResponse> {
    return blogPostService.createBlogPost(data);
  }

  async updateBlogPost(id: number, data: UpdateBlogPostRequest): Promise<BlogMutationResponse> {
    return blogPostService.updateBlogPost(id, data);
  }

  async deleteBlogPost(id: number): Promise<void> {
    return blogPostService.deleteBlogPost(id);
  }

  async getBlogCategories(keyword?: string): Promise<ProjectCategoryOptionListResponse> {
    return blogPostService.getBlogCategories(keyword);
  }

  async getTags(keyword?: string): Promise<BlogTagOptionListResponse> {
    return blogPostService.getTags(keyword);
  }
}

export const blogPostRepository = new BlogPostRepository();
