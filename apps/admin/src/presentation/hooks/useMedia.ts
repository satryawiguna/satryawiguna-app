import { useState, useCallback, useMemo, useDeferredValue } from 'react';
import { useQuery } from '@tanstack/react-query';
import { mediaRepository } from '../../data/repositories';
import type { MediaListResponse } from 'shared-types';

export interface MediaFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword: string;
}

const DEFAULT_FILTERS: MediaFilters = {
  page: 1,
  limit: 20,
  sortBy: 'created_at',
  sortOrder: 'desc',
  keyword: '',
};

export function useMedia() {
  const [filters, setFilters] = useState<MediaFilters>(DEFAULT_FILTERS);
  const deferredKeyword = useDeferredValue(filters.keyword);

  const queryParams = useMemo(
    () => ({
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      keyword: deferredKeyword,
    }),
    [filters.page, filters.limit, filters.sortBy, filters.sortOrder, deferredKeyword]
  );

  const query = useQuery<MediaListResponse>({
    queryKey: ['media', queryParams],
    queryFn: () => mediaRepository.getMediaList(queryParams),
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
    media: query.data?.data ?? [],
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
