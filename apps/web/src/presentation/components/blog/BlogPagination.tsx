'use client';

import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { BlogPagination as BlogPaginationType } from '@/domain/entities';

const PAGE_BUTTON_BASE = {
  backgroundColor: '#131b2e',
  border: '1px solid #3b494b',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  minWidth: '40px',
  height: '40px',
  px: '12px',
  userSelect: 'none',
} as const;

interface BlogPaginationProps {
  pagination: BlogPaginationType;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({ pagination, currentPage, onPageChange }: BlogPaginationProps) {
  const { total, page, limit, totalPages } = pagination;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  const showEllipsisLeft = pageNumbers[0] > 1;
  const showEllipsisRight = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        pt: '25px',
        width: '100%',
      }}
    >
      {/* Showing X to Y of Z results */}
      <Typography
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '18px',
          color: '#b9cacb',
        }}
      >
        Showing{' '}
        <Box component="span" sx={{ color: '#dbfcff', fontWeight: 700 }}>
          {from}
        </Box>{' '}
        to{' '}
        <Box component="span" sx={{ color: '#dbfcff', fontWeight: 700 }}>
          {to}
        </Box>{' '}
        of{' '}
        <Box component="span" sx={{ color: '#dbfcff', fontWeight: 700 }}>
          {total}
        </Box>{' '}
        results
      </Typography>

      {/* Pagination bar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Previous */}
        <Box
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          sx={{
            ...PAGE_BUTTON_BASE,
            borderRadius: '6px 0 0 6px',
            borderRight: 'none',
            opacity: currentPage === 1 ? 0.4 : 1,
            pointerEvents: currentPage === 1 ? 'none' : 'auto',
            gap: '4px',
          }}
        >
          <ChevronLeftIcon sx={{ color: '#b9cacb', fontSize: '16px' }} />
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '18px',
              color: '#b9cacb',
              whiteSpace: 'nowrap',
            }}
          >
            Previous
          </Typography>
        </Box>

        {/* Left ellipsis */}
        {showEllipsisLeft && (
          <Box
            sx={{
              ...PAGE_BUTTON_BASE,
              borderRadius: 0,
              borderRight: 'none',
              cursor: 'default',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: '#b9cacb',
              }}
            >
              ...
            </Typography>
          </Box>
        )}

        {/* Page numbers */}
        {pageNumbers.map((p) => {
          const isActive = p === currentPage;
          return (
            <Box
              key={p}
              onClick={() => onPageChange(p)}
              sx={{
                ...PAGE_BUTTON_BASE,
                borderRadius: 0,
                backgroundColor: isActive ? 'rgba(0, 240, 255, 0.2)' : '#131b2e',
                border: isActive ? '1px solid #00dbe9' : '1px solid #3b494b',
                borderRight: 'none',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: isActive ? '#00dbe9' : '#b9cacb',
                }}
              >
                {p}
              </Typography>
            </Box>
          );
        })}

        {/* Right ellipsis */}
        {showEllipsisRight && (
          <Box
            sx={{
              ...PAGE_BUTTON_BASE,
              borderRadius: 0,
              borderRight: 'none',
              cursor: 'default',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                color: '#b9cacb',
              }}
            >
              ...
            </Typography>
          </Box>
        )}

        {/* Next */}
        <Box
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          sx={{
            ...PAGE_BUTTON_BASE,
            borderRadius: '0 6px 6px 0',
            opacity: currentPage === totalPages ? 0.4 : 1,
            pointerEvents: currentPage === totalPages ? 'none' : 'auto',
            gap: '4px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '18px',
              color: '#b9cacb',
              whiteSpace: 'nowrap',
            }}
          >
            Next
          </Typography>
          <ChevronRightIcon sx={{ color: '#b9cacb', fontSize: '16px' }} />
        </Box>
      </Box>
    </Box>
  );
}
