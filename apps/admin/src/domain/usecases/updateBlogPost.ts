import { blogPostRepository } from '../../data/repositories';
import type { BlogMutationResponse, UpdateBlogPostRequest } from 'shared-types';

export class UpdateBlogPostUseCase {
  async execute(id: number, data: UpdateBlogPostRequest): Promise<BlogMutationResponse> {
    return blogPostRepository.updateBlogPost(id, data);
  }
}

export const updateBlogPostUseCase = new UpdateBlogPostUseCase();
