'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryRepository } from '../../data/repositories';
import type {
  CategoryQueryParams,
  CategoryListResponse,
  CategoryDetailResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const CATEGORY_QUERY_KEYS = {
  all: ['categories'] as const,
  list: (params: CategoryQueryParams) => ['categories', 'list', params] as const,
  detail: (id: number) => ['categories', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface CategoryFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
  type: string | null;
}

const DEFAULT_FILTERS: CategoryFilters = {
  page: 1,
  limit: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  keyword: '',
  type: null,
};

// ── useCategories ─────────────────────────────────────────────────

export function useCategories() {
  const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<CategoryQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
      ...(filters.type !== null && { type: filters.type }),
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword, filters.type]
  );

  const query = useQuery<CategoryListResponse>({
    queryKey: CATEGORY_QUERY_KEYS.list(queryParams),
    queryFn: () => categoryRepository.getCategories(queryParams),
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

  const setType = useCallback((type: string | null) => {
    setFilters((prev) => ({ ...prev, type, page: 1 }));
  }, []);

  return {
    categories: query.data?.data ?? [],
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
    setType,
    refetch: query.refetch,
  };
}

// ── useCategoryDetail ─────────────────────────────────────────────

export function useCategoryDetail(id: number | null) {
  return useQuery<CategoryDetailResponse>({
    queryKey: CATEGORY_QUERY_KEYS.detail(id!),
    queryFn: () => categoryRepository.getCategoryById(id!),
    enabled: id !== null,
  });
}

// ── useCreateCategory ─────────────────────────────────────────────

export function useCreateCategory(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoryRepository.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateCategory ─────────────────────────────────────────────

export function useUpdateCategory(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => categoryRepository.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteCategory ─────────────────────────────────────────────

export function useDeleteCategory(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoryRepository.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
