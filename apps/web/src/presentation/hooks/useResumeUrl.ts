import { useQuery } from '@tanstack/react-query';
import { publicProjectService } from 'shared-api';

const RESUME_SLUG = 'RESUME_FILE_URL';

export const useResumeUrl = () => {
  return useQuery({
    queryKey: ['settings', RESUME_SLUG],
    queryFn: () => publicProjectService.getSettingBySlug(RESUME_SLUG),
    staleTime: 5 * 60 * 1000,
  });
};
