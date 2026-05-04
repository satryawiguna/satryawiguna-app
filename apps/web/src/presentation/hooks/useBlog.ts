import { useQuery } from '@tanstack/react-query';
import { blogRepository } from '../../data/repositories';

/**
 * Hook to fetch blog posts
 */
export const useBlogPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['blog', 'posts', limit],
    queryFn: () => blogRepository.getPosts(limit),
  });
};

/**
 * Hook to fetch a single blog post by slug
 */
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog', 'post', slug],
    queryFn: () => blogRepository.getPostBySlug(slug),
    enabled: !!slug,
  });
};

/**
 * Hook to fetch posts by tag
 */
export const useBlogPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: ['blog', 'posts', 'tag', tag],
    queryFn: () => blogRepository.getPostsByTag(tag),
    enabled: !!tag,
  });
};
