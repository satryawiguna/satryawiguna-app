'use client';

import { Box } from '@mui/material';

const pulseKeyframes = {
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.4 },
  },
};

const skeletonBg = 'rgba(255, 255, 255, 0.03)';
const skeletonBgLight = 'rgba(255, 255, 255, 0.04)';

const pulseAnim = {
  animation: 'pulse 1.5s ease-in-out infinite',
};

// ── Featured card skeleton ───────────────────────────────────────

function FeaturedCardSkeleton() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        minHeight: { md: '607px' },
        width: '100%',
        ...pulseKeyframes,
      }}
    >
      {/* Image skeleton */}
      <Box
        sx={{
          minHeight: { xs: '240px', md: '100%' },
          backgroundColor: skeletonBg,
          ...pulseAnim,
        }}
      />

      {/* Content skeleton */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: '32px', md: '48px' },
          py: { xs: '40px', md: '163.5px' },
          gap: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box
            sx={{
              width: '100px',
              height: '24px',
              borderRadius: '2px',
              backgroundColor: skeletonBg,
              ...pulseAnim,
            }}
          />
          <Box
            sx={{
              width: '120px',
              height: '16px',
              borderRadius: '4px',
              backgroundColor: skeletonBgLight,
              ...pulseAnim,
            }}
          />
        </Box>
        <Box
          sx={{
            width: '90%',
            height: '40px',
            borderRadius: '4px',
            backgroundColor: skeletonBg,
            ...pulseAnim,
          }}
        />
        <Box
          sx={{
            width: '70%',
            height: '20px',
            borderRadius: '4px',
            backgroundColor: skeletonBgLight,
            ...pulseAnim,
          }}
        />
        <Box
          sx={{
            width: '50%',
            height: '20px',
            borderRadius: '4px',
            backgroundColor: skeletonBgLight,
            ...pulseAnim,
          }}
        />
        <Box
          sx={{
            width: '120px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: skeletonBg,
            mt: '24px',
            ...pulseAnim,
          }}
        />
      </Box>
    </Box>
  );
}

// ── Bento card skeleton ──────────────────────────────────────────

function BentoCardSkeleton() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        p: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...pulseKeyframes,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Box
          sx={{
            width: '80px',
            height: '24px',
            borderRadius: '2px',
            backgroundColor: skeletonBg,
            ...pulseAnim,
          }}
        />
        <Box
          sx={{
            width: '100px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: skeletonBgLight,
            ...pulseAnim,
          }}
        />
      </Box>
      <Box
        sx={{
          width: '85%',
          height: '28px',
          borderRadius: '4px',
          backgroundColor: skeletonBg,
          ...pulseAnim,
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: skeletonBgLight,
          ...pulseAnim,
        }}
      />
      <Box
        sx={{
          width: '65%',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: skeletonBgLight,
          ...pulseAnim,
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', mt: 'auto' }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: '32px',
              height: '32px',
              borderRadius: '12px',
              backgroundColor: skeletonBg,
              border: '2px solid #0b1326',
              ...pulseAnim,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

// ── Main skeleton loader ─────────────────────────────────────────

export function BlogSkeletonLoader() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      <FeaturedCardSkeleton />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: '24px',
        }}
      >
        <BentoCardSkeleton />
        <BentoCardSkeleton />
        <BentoCardSkeleton />
      </Box>
    </Box>
  );
}
