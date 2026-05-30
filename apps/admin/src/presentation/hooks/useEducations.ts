'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationRepository } from '../../data/repositories';
import type {
  EducationQueryParams,
  EducationListResponse,
  EducationDetailResponse,
  CreateEducationRequest,
  UpdateEducationRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const EDUCATION_QUERY_KEYS = {
  all: ['educations'] as const,
  list: (params: EducationQueryParams) => ['educations', 'list', params] as const,
  detail: (id: number) => ['educations', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface EducationFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: EducationFilters = {
  page: 1,
  limit: 10,
  sortBy: 'sort_order',
  sortOrder: 'asc',
  keyword: '',
};

// ── useEducations ─────────────────────────────────────────────────

export function useEducations() {
  const [filters, setFilters] = useState<EducationFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<EducationQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword]
  );

  const query = useQuery<EducationListResponse>({
    queryKey: EDUCATION_QUERY_KEYS.list(queryParams),
    queryFn: () => educationRepository.getEducations(queryParams),
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
    educations: query.data?.data ?? [],
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

// ── useEducationDetail ────────────────────────────────────────────

export function useEducationDetail(id: number | null) {
  return useQuery<EducationDetailResponse>({
    queryKey: EDUCATION_QUERY_KEYS.detail(id!),
    queryFn: () => educationRepository.getEducationById(id!),
    enabled: id !== null,
  });
}

// ── useCreateEducation ────────────────────────────────────────────

export function useCreateEducation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEducationRequest) => educationRepository.createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateEducation ────────────────────────────────────────────

export function useUpdateEducation(id: number | null, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEducationRequest) => educationRepository.updateEducation(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useDeleteEducation ────────────────────────────────────────────

export function useDeleteEducation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => educationRepository.deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
