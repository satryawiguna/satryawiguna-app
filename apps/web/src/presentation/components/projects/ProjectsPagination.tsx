'use client';

import { Box, Pagination, Typography } from '@mui/material';
import type { ProjectPagination } from '@/domain/entities';

interface ProjectsPaginationProps {
  pagination: ProjectPagination;
  onPageChange: (page: number) => void;
}

export function ProjectsPagination({ pagination, onPageChange }: ProjectsPaginationProps) {
  if (pagination.totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        mt: '16px',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          color: '#8899aa',
        }}
      >
        Showing {(pagination.page - 1) * pagination.limit + 1}–
        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}{' '}
        projects
      </Typography>

      <Pagination
        count={pagination.totalPages}
        page={pagination.page}
        onChange={(_e, page) => onPageChange(page)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#b9cacb',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'rgba(0, 219, 233, 0.15)',
            color: '#00dbe9',
            borderColor: 'rgba(0, 219, 233, 0.3)',
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      />
    </Box>
  );
}
