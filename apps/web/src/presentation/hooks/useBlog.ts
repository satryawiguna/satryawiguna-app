import { useQuery } from '@tanstack/react-query';
import { getPublishedPostsUseCase } from '../../domain/usecases';
import { getBlogPostDetailUseCase } from '../../domain/usecases';
import type { BlogQueryParams } from 'shared-types';

export const BLOG_QUERY_KEYS = {
  all: ['blog'] as const,
  list: (params?: BlogQueryParams) => ['blog', 'list', params] as const,
  detail: (id: number) => ['blog', 'detail', id] as const,
};

/**
 * Hook to fetch paginated blog posts list
 */
export const useBlogPosts = (params?: BlogQueryParams) => {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.list(params),
    queryFn: () => getPublishedPostsUseCase.execute(params),
  });
};

/**
 * Hook to fetch a single blog post by id
 */
export const useBlogPost = (id: number) => {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.detail(id),
    queryFn: () => getBlogPostDetailUseCase.execute(id),
    enabled: !!id,
  });
};
