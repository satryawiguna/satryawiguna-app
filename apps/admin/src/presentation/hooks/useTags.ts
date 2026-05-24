'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagRepository } from '../../data/repositories';
import type {
  TagQueryParams,
  TagListResponse,
  TagDetailResponse,
  CreateTagRequest,
  UpdateTagRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const TAG_QUERY_KEYS = {
  all: ['tags'] as const,
  list: (params: TagQueryParams) => ['tags', 'list', params] as const,
  detail: (id: number) => ['tags', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface TagFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: TagFilters = {
  page: 1,
  limit: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  keyword: '',
};

// ── useTags ───────────────────────────────────────────────────────

export function useTags() {
  const [filters, setFilters] = useState<TagFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<TagQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword]
  );

  const query = useQuery<TagListResponse>({
    queryKey: TAG_QUERY_KEYS.list(queryParams),
    queryFn: () => tagRepository.getTags(queryParams),
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

  return {
    tags: query.data?.data ?? [],
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
    refetch: query.refetch,
  };
}

// ── useTagDetail ──────────────────────────────────────────────────

export function useTagDetail(id: number | null) {
  return useQuery<TagDetailResponse>({
    queryKey: TAG_QUERY_KEYS.detail(id!),
    queryFn: () => tagRepository.getTagById(id!),
    enabled: id !== null,
  });
}

// ── useCreateTag ──────────────────────────────────────────────────

export function useCreateTag(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTagRequest) => tagRepository.createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateTag ──────────────────────────────────────────────────

export function useUpdateTag(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTagRequest) => tagRepository.updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteTag ──────────────────────────────────────────────────

export function useDeleteTag(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tagRepository.deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TAG_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
