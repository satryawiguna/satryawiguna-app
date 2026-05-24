'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogPostRepository } from '../../data/repositories';
import type {
  BlogQueryParams,
  BlogListResponse,
  BlogDetailResponse,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const BLOG_POST_QUERY_KEYS = {
  all: ['blogPosts'] as const,
  list: (params: BlogQueryParams) => ['blogPosts', 'list', params] as const,
  detail: (id: number) => ['blogPosts', 'detail', id] as const,
  blogCategories: ['blogPosts', 'categories'] as const,
  blogCategoriesSearch: (keyword: string) =>
    ['blogPosts', 'categories', 'search', keyword] as const,
  tags: ['blogPosts', 'tags'] as const,
  tagsSearch: (keyword: string) => ['blogPosts', 'tags', 'search', keyword] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface BlogPostFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
  category_id: number | null;
  tag_id: number | null;
}

const DEFAULT_FILTERS: BlogPostFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
  category_id: null,
  tag_id: null,
};

// ── useBlogPosts ──────────────────────────────────────────────────

export function useBlogPosts() {
  const [filters, setFilters] = useState<BlogPostFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<BlogQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
      ...(filters.category_id !== null && { category_id: filters.category_id }),
      ...(filters.tag_id !== null && { tag_id: filters.tag_id }),
    }),
    [
      filters.page,
      filters.limit,
      filters.sortBy,
      filters.sortOrder,
      deferredKeyword,
      filters.category_id,
      filters.tag_id,
    ]
  );

  const query = useQuery<BlogListResponse>({
    queryKey: BLOG_POST_QUERY_KEYS.list(queryParams),
    queryFn: () => blogPostRepository.getBlogPosts(queryParams),
    placeholderData: (prev) => prev,
  });

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const setKeyword = useCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword, page: 1 }));
  }, []);

  const setSortBy = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  }, []);

  const setSortOrder = useCallback((sortOrder: 'asc' | 'desc') => {
    setFilters((prev) => ({ ...prev, sortOrder, page: 1 }));
  }, []);

  const setCategoryId = useCallback((category_id: number | null) => {
    setFilters((prev) => ({ ...prev, category_id, page: 1 }));
  }, []);

  const setTagId = useCallback((tag_id: number | null) => {
    setFilters((prev) => ({ ...prev, tag_id, page: 1 }));
  }, []);

  return {
    blogPosts: query.data?.data ?? [],
    pagination: query.data?.pagination ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    filters,
    setPage,
    setKeyword,
    setSortBy,
    setSortOrder,
    setCategoryId,
    setTagId,
    refetch: query.refetch,
  };
}

// ── useBlogPostDetail ─────────────────────────────────────────────

export function useBlogPostDetail(id: number | null) {
  return useQuery<BlogDetailResponse>({
    queryKey: BLOG_POST_QUERY_KEYS.detail(id!),
    queryFn: () => blogPostRepository.getBlogPostById(id!),
    enabled: id !== null,
  });
}

// ── useCreateBlogPost ─────────────────────────────────────────────

export function useCreateBlogPost(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogPostRequest) => blogPostRepository.createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateBlogPost ─────────────────────────────────────────────

export function useUpdateBlogPost(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBlogPostRequest) => blogPostRepository.updateBlogPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: BLOG_POST_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteBlogPost ─────────────────────────────────────────────

export function useDeleteBlogPost(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogPostRepository.deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_POST_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useBlogCategoriesSearch (autocomplete) ────────────────────────

export function useBlogCategoriesSearch(keyword: string) {
  return useQuery({
    queryKey: BLOG_POST_QUERY_KEYS.blogCategoriesSearch(keyword),
    queryFn: () => blogPostRepository.getBlogCategories(keyword || undefined),
    staleTime: 2 * 60 * 1000,
    enabled: true,
    select: (res) => res.data,
  });
}

// ── useTagsSearch (autocomplete) ──────────────────────────────────

export function useTagsSearch(keyword: string) {
  return useQuery({
    queryKey: BLOG_POST_QUERY_KEYS.tagsSearch(keyword),
    queryFn: () => blogPostRepository.getTags(keyword || undefined),
    staleTime: 2 * 60 * 1000,
    enabled: true,
    select: (res) => res.data,
  });
}
