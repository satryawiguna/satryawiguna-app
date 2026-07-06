import { publicBlogPostService } from 'shared-api';
import type { BlogQueryParams } from 'shared-types';
import type { BlogPost, BlogCategory, BlogTag, BlogPagination } from '../../domain/entities';

// ── Category color map (deterministic by slug) ────────────────────

const CATEGORY_COLORS: Record<string, { bgColor: string; textColor: string }> = {
  architecture: { bgColor: 'rgba(78, 222, 163, 0.1)', textColor: '#4edea3' },
  'mobile-application': { bgColor: 'rgba(78, 222, 163, 0.1)', textColor: '#4edea3' },
  frontend: { bgColor: 'rgba(227, 210, 255, 0.2)', textColor: '#742fe5' },
  backend: { bgColor: 'rgba(0, 240, 255, 0.1)', textColor: '#00dbe9' },
  mobile: { bgColor: 'rgba(251, 191, 36, 0.1)', textColor: '#fbbf24' },
  devops: { bgColor: 'rgba(56, 189, 248, 0.1)', textColor: '#38bdf8' },
};

const DEFAULT_CATEGORY_COLOR = { bgColor: 'rgba(148, 163, 184, 0.1)', textColor: '#94a3b8' };

function getCategoryColor(slug: string) {
  return CATEGORY_COLORS[slug] ?? DEFAULT_CATEGORY_COLOR;
}

// ── Mapper ────────────────────────────────────────────────────────

function mapApiCategory(cat: {
  id: number;
  name: string;
  slug: string;
  type: string;
}): BlogCategory {
  const color = getCategoryColor(cat.slug);
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    type: cat.type,
    label: cat.name.toUpperCase(),
    bgColor: color.bgColor,
    textColor: color.textColor,
  };
}

function mapApiTag(tag: { id: number; name: string; slug: string }): BlogTag {
  return {
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  };
}

function computeReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function mapApiPost(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    thumbnail_url: post.thumbnail_url,
    image_url: post.image_url,
    image: post.thumbnail_url,
    status: post.status,
    author_id: post.author_id,
    published_at: post.published_at,
    created_at: post.created_at,
    updated_at: post.updated_at,
    date: formatDate(post.published_at),
    readingTime: computeReadingTime(post.content),
    categories: (post.categories ?? []).map(mapApiCategory),
    tags: (post.tags ?? []).map(mapApiTag),
  };
}

// ── Repository ────────────────────────────────────────────────────

/**
 * Blog Repository - handles blog data operations via public API
 */
export class BlogRepository {
  async getPosts(
    params?: BlogQueryParams,
  ): Promise<{ data: BlogPost[]; pagination: BlogPagination }> {
    const response = await publicBlogPostService.getBlogPosts(params);
    return {
      data: (response.data ?? []).map(mapApiPost),
      pagination: response.pagination,
    };
  }

  async getPostById(id: number): Promise<BlogPost> {
    const response = await publicBlogPostService.getBlogPostById(id);
    return mapApiPost(response.data);
  }
}

export const blogRepository = new BlogRepository();
