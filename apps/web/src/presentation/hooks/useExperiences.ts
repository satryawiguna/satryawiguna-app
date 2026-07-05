import { useQuery } from '@tanstack/react-query';
import { experienceRepository } from '../../data/repositories';

/**
 * Hook to fetch public experiences
 */
export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => experienceRepository.getExperiences(),
  });
};
