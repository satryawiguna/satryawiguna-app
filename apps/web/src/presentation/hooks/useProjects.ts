import { useQuery } from '@tanstack/react-query';
import { projectRepository } from '../../data/repositories';
import type { ProjectQueryParams } from 'shared-types';

export const PROJECT_QUERY_KEYS = {
  all: ['projects'] as const,
  list: (params?: ProjectQueryParams) => ['projects', 'list', params] as const,
  detail: (id: number) => ['projects', 'detail', id] as const,
};

/**
 * Hook to fetch paginated project list
 */
export const useProjects = (params?: ProjectQueryParams) => {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.list(params),
    queryFn: () => projectRepository.getProjects(params),
  });
};

/**
 * Hook to fetch a single project detail by id
 */
export const useProjectDetail = (id: number) => {
  return useQuery({
    queryKey: PROJECT_QUERY_KEYS.detail(id),
    queryFn: () => projectRepository.getProjectById(id),
    enabled: !!id,
  });
};
