import { blogPostRepository } from '../../data/repositories';
import type { BlogMutationResponse, CreateBlogPostRequest } from 'shared-types';

export class CreateBlogPostUseCase {
  async execute(data: CreateBlogPostRequest): Promise<BlogMutationResponse> {
    return blogPostRepository.createBlogPost(data);
  }
}

export const createBlogPostUseCase = new CreateBlogPostUseCase();
