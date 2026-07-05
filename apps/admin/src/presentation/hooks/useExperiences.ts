'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experienceRepository } from '../../data/repositories';
import type {
  ExperienceQueryParams,
  ExperienceListResponse,
  ExperienceDetailResponse,
  CreateExperienceRequest,
  UpdateExperienceRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const EXPERIENCE_QUERY_KEYS = {
  all: ['experiences'] as const,
  list: (params: ExperienceQueryParams) => ['experiences', 'list', params] as const,
  detail: (id: number) => ['experiences', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface ExperienceFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: ExperienceFilters = {
  page: 1,
  limit: 10,
  sortBy: 'sort_order',
  sortOrder: 'asc',
  keyword: '',
};

// ── useExperiences ────────────────────────────────────────────────

export function useExperiences() {
  const [filters, setFilters] = useState<ExperienceFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<ExperienceQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword]
  );

  const query = useQuery<ExperienceListResponse>({
    queryKey: EXPERIENCE_QUERY_KEYS.list(queryParams),
    queryFn: () => experienceRepository.getExperiences(queryParams),
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
    experiences: query.data?.data ?? [],
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

// ── useExperienceDetail ───────────────────────────────────────────

export function useExperienceDetail(id: number | null) {
  return useQuery<ExperienceDetailResponse>({
    queryKey: EXPERIENCE_QUERY_KEYS.detail(id!),
    queryFn: () => experienceRepository.getExperienceById(id!),
    enabled: id !== null,
  });
}

// ── useCreateExperience ───────────────────────────────────────────

export function useCreateExperience(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExperienceRequest) => experienceRepository.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateExperience ───────────────────────────────────────────

export function useUpdateExperience(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateExperienceRequest) => experienceRepository.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteExperience ───────────────────────────────────────────

export function useDeleteExperience(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => experienceRepository.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
