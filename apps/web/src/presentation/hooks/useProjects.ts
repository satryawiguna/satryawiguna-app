import { useQuery } from '@tanstack/react-query';
import { projectRepository } from '../../data/repositories';

/**
 * Hook to fetch all projects
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projectRepository.getProjects(),
  });
};

/**
 * Hook to fetch featured projects
 */
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => projectRepository.getFeaturedProjects(),
  });
};

/**
 * Hook to fetch a single project
 */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectRepository.getProjectById(id),
    enabled: !!id,
  });
};
