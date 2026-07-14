'use client';

import { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { useProjects } from '@/presentation/hooks/useProjects';
import { ProjectsHero } from './ProjectsHero';
import { ProjectsGridSkeleton } from './ProjectsGridSkeleton';
import { ProjectsGrid } from './ProjectsGrid';
import { ProjectsPagination } from './ProjectsPagination';
import { ProjectsCTA } from './ProjectsCTA';

export function ProjectsPageClient() {
  const [page, setPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const limit = 9;

  const { data, isLoading, error } = useProjects({
    page,
    limit,
    ...(selectedCategoryId ? { category_id: selectedCategoryId } : {}),
  });

  const handleCategoryChange = useCallback((categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setPage(1);
  }, []);

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
      <ProjectsHero
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
      />

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
