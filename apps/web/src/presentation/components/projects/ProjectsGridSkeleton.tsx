'use client';

import { Box } from '@mui/material';

function SkeletonCard() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '1px',
      }}
    >
      {/* Image skeleton */}
      <Box
        sx={{
          height: '192px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.4 },
          },
        }}
      />

      {/* Content skeleton */}
      <Box sx={{ p: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Category badge skeleton */}
        <Box
          sx={{
            width: '80px',
            height: '23px',
            borderRadius: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />

        {/* Title skeleton */}
        <Box
          sx={{
            width: '80%',
            height: '28px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            mt: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />

        {/* Subtitle skeleton */}
        <Box
          sx={{
            width: '50%',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />

        {/* Description lines skeleton */}
        <Box
          sx={{
            width: '100%',
            height: '14px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            mt: '4px',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            width: '70%',
            height: '14px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />

        {/* Tech tags skeleton */}
        <Box sx={{ display: 'flex', gap: '8px', mt: '16px' }}>
          <Box
            sx={{
              width: '60px',
              height: '24px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              width: '80px',
              height: '24px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              width: '50px',
              height: '24px',
              borderRadius: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: '24px',
        width: '100%',
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Box>
  );
}
