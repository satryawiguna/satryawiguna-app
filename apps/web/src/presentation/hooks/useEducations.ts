import { useQuery } from '@tanstack/react-query';
import { educationRepository } from '../../data/repositories';

/**
 * Hook to fetch public educations
 */
export const useEducations = () => {
  return useQuery({
    queryKey: ['educations'],
    queryFn: () => educationRepository.getEducations(),
  });
};
