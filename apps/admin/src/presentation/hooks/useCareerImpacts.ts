'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerImpactRepository } from '../../data/repositories';
import type {
  CareerImpactQueryParams,
  CareerImpactListResponse,
  CareerImpactDetailResponse,
  CreateCareerImpactRequest,
  UpdateCareerImpactRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const CAREER_IMPACT_QUERY_KEYS = {
  all: ['careerImpacts'] as const,
  list: (params: CareerImpactQueryParams) => ['careerImpacts', 'list', params] as const,
  detail: (id: number) => ['careerImpacts', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface CareerImpactFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: CareerImpactFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
};

// ── useCareerImpacts ──────────────────────────────────────────────

export function useCareerImpacts() {
  const [filters, setFilters] = useState<CareerImpactFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<CareerImpactQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword],
  );

  const query = useQuery<CareerImpactListResponse>({
    queryKey: CAREER_IMPACT_QUERY_KEYS.list(queryParams),
    queryFn: () => careerImpactRepository.getCareerImpacts(queryParams),
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
    careerImpacts: query.data?.data ?? [],
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

// ── useCareerImpactDetail ─────────────────────────────────────────

export function useCareerImpactDetail(id: number | null) {
  return useQuery<CareerImpactDetailResponse>({
    queryKey: CAREER_IMPACT_QUERY_KEYS.detail(id!),
    queryFn: () => careerImpactRepository.getCareerImpactById(id!),
    enabled: id !== null,
  });
}

// ── useCreateCareerImpact ─────────────────────────────────────────

export function useCreateCareerImpact(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCareerImpactRequest) =>
      careerImpactRepository.createCareerImpact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_IMPACT_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateCareerImpact ─────────────────────────────────────────

export function useUpdateCareerImpact(id: number | null, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCareerImpactRequest) =>
      careerImpactRepository.updateCareerImpact(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_IMPACT_QUERY_KEYS.all });
      if (id) {
        queryClient.invalidateQueries({ queryKey: CAREER_IMPACT_QUERY_KEYS.detail(id) });
      }
      onSuccess?.();
    },
  });
}

// ── useDeleteCareerImpact ─────────────────────────────────────────

export function useDeleteCareerImpact(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => careerImpactRepository.deleteCareerImpact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAREER_IMPACT_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
