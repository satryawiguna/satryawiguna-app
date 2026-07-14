import { useQuery } from '@tanstack/react-query';
import { categoryRepository } from '../../data/repositories/categoryRepository';
import type { CategoryQueryParams } from 'shared-types';

/**
 * Hook to fetch public categories
 */
export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryRepository.getCategories(params),
  });
};
