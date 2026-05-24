'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillRepository } from '../../data/repositories';
import type {
  SkillQueryParams,
  SkillListResponse,
  SkillDetailResponse,
  CreateSkillRequest,
  UpdateSkillRequest,
  ProjectCategoryOptionListResponse,
  ProjectCategoryOption,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const SKILL_QUERY_KEYS = {
  all: ['skills'] as const,
  list: (params: SkillQueryParams) => ['skills', 'list', params] as const,
  detail: (id: number) => ['skills', 'detail', id] as const,
  categoriesSearch: (keyword: string) => ['skills', 'categories', 'search', keyword] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface SkillFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
  category_id: number | null;
}

const DEFAULT_FILTERS: SkillFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
  category_id: null,
};

// ── useSkills ─────────────────────────────────────────────────────

export function useSkills() {
  const [filters, setFilters] = useState<SkillFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<SkillQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
      ...(filters.category_id !== null && { category_id: filters.category_id }),
    }),
    [
      filters.page,
      filters.limit,
      filters.sortBy,
      filters.sortOrder,
      deferredKeyword,
      filters.category_id,
    ]
  );

  const query = useQuery<SkillListResponse>({
    queryKey: SKILL_QUERY_KEYS.list(queryParams),
    queryFn: () => skillRepository.getSkills(queryParams),
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

  return {
    skills: query.data?.data ?? [],
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
    refetch: query.refetch,
  };
}

// ── useSkillDetail ────────────────────────────────────────────────

export function useSkillDetail(id: number | null) {
  return useQuery<SkillDetailResponse>({
    queryKey: SKILL_QUERY_KEYS.detail(id!),
    queryFn: () => skillRepository.getSkillById(id!),
    enabled: id !== null,
  });
}

// ── useCreateSkill ────────────────────────────────────────────────

export function useCreateSkill(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSkillRequest) => skillRepository.createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateSkill ────────────────────────────────────────────────

export function useUpdateSkill(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSkillRequest) => skillRepository.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteSkill ────────────────────────────────────────────────

export function useDeleteSkill(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => skillRepository.deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useSkillCategoriesSearch (autocomplete) ───────────────────────

export function useSkillCategoriesSearch(keyword: string) {
  return useQuery<ProjectCategoryOptionListResponse, Error, ProjectCategoryOption[]>({
    queryKey: SKILL_QUERY_KEYS.categoriesSearch(keyword),
    queryFn: () => skillRepository.getSkillCategories(keyword || undefined),
    staleTime: 2 * 60 * 1000,
    enabled: true,
    select: (res) => res.data,
  });
}
