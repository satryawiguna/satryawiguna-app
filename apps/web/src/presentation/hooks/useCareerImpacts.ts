import { useQuery } from '@tanstack/react-query';
import { careerImpactRepository } from '../../data/repositories';

/**
 * Hook to fetch career impacts (public)
 */
export const useCareerImpacts = () => {
  return useQuery({
    queryKey: ['careerImpacts'],
    queryFn: () => careerImpactRepository.getCareerImpacts(),
  });
};
