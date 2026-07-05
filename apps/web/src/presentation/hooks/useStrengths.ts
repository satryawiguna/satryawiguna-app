import { useQuery } from '@tanstack/react-query';
import {
  strengthRepository,
  type PublicStrengthQueryParams,
} from '../../data/repositories/strengthRepository';

/**
 * Hook to fetch public strengths
 */
export const useStrengths = (params?: PublicStrengthQueryParams) => {
  return useQuery({
    queryKey: ['strengths', params],
    queryFn: () => strengthRepository.getStrengths(params),
  });
};
