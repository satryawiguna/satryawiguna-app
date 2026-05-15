'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  currentPage?: number;
  totalPages?: number;
  totalResults?: number;
  perPage?: number;
}

export function BlogPagination({
  currentPage: initialPage = 1,
  totalPages = 4,
  totalResults = 24,
  perPage = 6,
}: BlogPaginationProps) {
  const [page, setPage] = useState(initialPage);

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, totalResults);

  const pages = [1, 2, 3];
  const showEllipsis = totalPages > 4;

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
          {totalResults}
        </Box>{' '}
        results
      </Typography>

      {/* Pagination bar */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Previous */}
        <Box
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          sx={{
            ...PAGE_BUTTON_BASE,
            borderRadius: '6px 0 0 6px',
            borderRight: 'none',
            opacity: page === 1 ? 0.4 : 1,
            pointerEvents: page === 1 ? 'none' : 'auto',
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

        {/* Page numbers */}
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <Box
              key={p}
              onClick={() => setPage(p)}
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

        {/* Ellipsis */}
        {showEllipsis && (
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
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          sx={{
            ...PAGE_BUTTON_BASE,
            borderRadius: '0 6px 6px 0',
            opacity: page === totalPages ? 0.4 : 1,
            pointerEvents: page === totalPages ? 'none' : 'auto',
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
