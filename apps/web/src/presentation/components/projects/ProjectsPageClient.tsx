'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { useProjects } from '@/presentation/hooks/useProjects';
import { ProjectsHero } from './ProjectsHero';
import { ProjectsGridSkeleton } from './ProjectsGridSkeleton';
import { ProjectsGrid } from './ProjectsGrid';
import { ProjectsPagination } from './ProjectsPagination';
import { ProjectsCTA } from './ProjectsCTA';

export function ProjectsPageClient() {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, error } = useProjects({ page, limit });

  const hasProjects = data?.data && data.data.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        width: '100%',
      }}
    >
      <ProjectsHero />

      {isLoading ? (
        <ProjectsGridSkeleton />
      ) : error || !hasProjects ? null : (
        <>
          <ProjectsGrid projects={data.data} />
          {data?.pagination && (
            <ProjectsPagination pagination={data.pagination} onPageChange={setPage} />
          )}
        </>
      )}

      <ProjectsCTA />
    </Box>
  );
}
