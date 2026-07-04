'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { strengthRepository } from '../../data/repositories';
import type {
  StrengthQueryParams,
  StrengthListResponse,
  StrengthDetailResponse,
  CreateStrengthRequest,
  UpdateStrengthRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const STRENGTH_QUERY_KEYS = {
  all: ['strengths'] as const,
  list: (params: StrengthQueryParams) => ['strengths', 'list', params] as const,
  detail: (id: number) => ['strengths', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface StrengthFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: StrengthFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
};

// ── useStrengths ──────────────────────────────────────────────────

export function useStrengths() {
  const [filters, setFilters] = useState<StrengthFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<StrengthQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword],
  );

  const query = useQuery<StrengthListResponse>({
    queryKey: STRENGTH_QUERY_KEYS.list(queryParams),
    queryFn: () => strengthRepository.getStrengths(queryParams),
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
    strengths: query.data?.data ?? [],
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

// ── useStrengthDetail ─────────────────────────────────────────────

export function useStrengthDetail(id: number | null) {
  return useQuery<StrengthDetailResponse>({
    queryKey: STRENGTH_QUERY_KEYS.detail(id!),
    queryFn: () => strengthRepository.getStrengthById(id!),
    enabled: id !== null,
  });
}

// ── useCreateStrength ─────────────────────────────────────────────

export function useCreateStrength(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStrengthRequest) => strengthRepository.createStrength(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRENGTH_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateStrength ─────────────────────────────────────────────

export function useUpdateStrength(id: number | null, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateStrengthRequest) => strengthRepository.updateStrength(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRENGTH_QUERY_KEYS.all });
      if (id) {
        queryClient.invalidateQueries({ queryKey: STRENGTH_QUERY_KEYS.detail(id) });
      }
      onSuccess?.();
    },
  });
}

// ── useDeleteStrength ─────────────────────────────────────────────

export function useDeleteStrength(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => strengthRepository.deleteStrength(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STRENGTH_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
