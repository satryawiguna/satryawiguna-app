import { useQuery } from '@tanstack/react-query';
import {
  skillRepository,
  type PublicSkillQueryParams,
} from '../../data/repositories/skillRepository';

/**
 * Hook to fetch public skills
 */
export const useSkills = (params?: PublicSkillQueryParams) => {
  return useQuery({
    queryKey: ['skills', params],
    queryFn: () => skillRepository.getSkills(params),
  });
};
