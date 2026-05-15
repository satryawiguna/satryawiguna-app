import { useQuery } from '@tanstack/react-query';
import { dashboardRepository } from '../../data/repositories';

/**
 * Hook to fetch dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardRepository.getStats(),
  });
};

/**
 * Hook to fetch recent activity
 */
export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: () => dashboardRepository.getRecentActivity(),
  });
};
