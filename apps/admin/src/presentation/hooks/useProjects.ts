'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectRepository } from '../../data/repositories';
import type {
  ProjectQueryParams,
  ProjectListResponse,
  ProjectDetailResponse,
  CreateProjectRequest,
  UpdateProjectRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const PROJECT_QUERY_KEYS = {
  all: ['projects'] as const,
  list: (params: ProjectQueryParams) => ['projects', 'list', params] as const,
  detail: (id: number) => ['projects', 'detail', id] as const,
  skills: ['projects', 'skills'] as const,
  skillsSearch: (keyword: string) => ['projects', 'skills', 'search', keyword] as const,
  categories: ['projects', 'categories'] as const,
  categoriesSearch: (keyword: string, type?: string) =>
    ['projects', 'categories', 'search', keyword, type ?? ''] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface ProjectFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
  category_id: number | null;
  skill_id: number | null;
}

const DEFAULT_FILTERS: ProjectFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
  category_id: null,
  skill_id: null,
};

// ── useProjects ───────────────────────────────────────────────────

export function useProjects() {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<ProjectQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
      ...(filters.category_id !== null && { category_id: filters.category_id }),
      ...(filters.skill_id !== null && { skill_id: filters.skill_id }),
    }),
    [
      filters.page,
      filters.limit,
      filters.sortBy,
      filters.sortOrder,
      deferredKeyword,
      filters.category_id,
      filters.skill_id,
    ]
  );

  const query = useQuery<ProjectListResponse>({
    queryKey: PROJECT_QUERY_KEYS.list(queryParams),
    queryFn: () => projectRepository.getProjects(queryParams),
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

  const setSkillId = useCallback((skill_id: number | null) => {
    setFilters((prev) => ({ ...prev, skill_id, page: 1 }));
  }, []);

  return {
    projects: query.data?.data ?? [],
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
    setSkillId,
    refetch: query.refetch,
  };
}

// ── useProjectDetail ──────────────────────────────────────────────

export function useProjectDetail(id: number | null) {
  return useQuery<ProjectDetailResponse>({
    queryKey: PROJECT_QUERY_KEYS.detail(id!),
    queryFn: () => projectRepository.getProjectById(id!),
    enabled: id !== null,
  });
}

// ── useCreateProject ──────────────────────────────────────────────

export function useCreateProject(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectRequest) => projectRepository.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateProject ──────────────────────────────────────────────

export function useUpdateProject(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectRequest) => projectRepository.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteProject ──────────────────────────────────────────────

export function useDeleteProject(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => projectRepository.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useSkillsSearch (autocomplete) ────────────────────────────────

export function useSkillsSearch(keyword: string) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.skillsSearch(keyword),
    queryFn: () => projectRepository.getSkills(keyword || undefined),
    staleTime: 2 * 60 * 1000,
    enabled: true,
    select: (res) => res.data,
  });
}

// ── useCategoriesSearch (autocomplete) ────────────────────────────

export function useCategoriesSearch(keyword: string, type?: string) {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.categoriesSearch(keyword, type),
    queryFn: () => projectRepository.getCategories(keyword || undefined, type),
    staleTime: 2 * 60 * 1000,
    enabled: true,
    select: (res) => res.data,
  });
}
