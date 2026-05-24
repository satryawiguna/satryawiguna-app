'use client';

import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminUserRepository } from '../../data/repositories';
import type {
  AdminUserQueryParams,
  AdminUserListResponse,
  AdminUserDetailResponse,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from 'shared-types';

// ── Query keys ────────────────────────────────────────────────────

export const ADMIN_USER_QUERY_KEYS = {
  all: ['adminUsers'] as const,
  list: (params: AdminUserQueryParams) => ['adminUsers', 'list', params] as const,
  detail: (id: number) => ['adminUsers', 'detail', id] as const,
};

// ── Filter state ──────────────────────────────────────────────────

export interface AdminUserFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: AdminUserFilters = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
};

// ── useAdminUsers ─────────────────────────────────────────────────

export function useAdminUsers() {
  const [filters, setFilters] = useState<AdminUserFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo<AdminUserQueryParams>(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword]
  );

  const query = useQuery<AdminUserListResponse>({
    queryKey: ADMIN_USER_QUERY_KEYS.list(queryParams),
    queryFn: () => adminUserRepository.getUsers(queryParams),
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
    users: query.data?.data ?? [],
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

// ── useAdminUserDetail ────────────────────────────────────────────

export function useAdminUserDetail(id: number | null) {
  return useQuery<AdminUserDetailResponse>({
    queryKey: ADMIN_USER_QUERY_KEYS.detail(id!),
    queryFn: () => adminUserRepository.getUserById(id!),
    enabled: id !== null,
  });
}

// ── useCreateAdminUser ────────────────────────────────────────────

export function useCreateAdminUser(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdminUserRequest) => adminUserRepository.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USER_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}

// ── useUpdateAdminUser ────────────────────────────────────────────

export function useUpdateAdminUser(id: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAdminUserRequest) => adminUserRepository.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USER_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ADMIN_USER_QUERY_KEYS.detail(id) });
      onSuccess?.();
    },
  });
}

// ── useDeleteAdminUser ────────────────────────────────────────────

export function useDeleteAdminUser(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminUserRepository.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USER_QUERY_KEYS.all });
      onSuccess?.();
    },
  });
}
