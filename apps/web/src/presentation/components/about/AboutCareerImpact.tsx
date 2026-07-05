'use client';

import { useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { useCareerImpacts } from '@/presentation/hooks';

export function AboutCareerImpact() {
  const { data: careerImpacts, isLoading } = useCareerImpacts();
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          py: '32px',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '28px', md: '40px' },
              lineHeight: { xs: '36px', md: '48px' },
              letterSpacing: '-0.4px',
              color: '#dae2fd',
              textAlign: 'center',
            }}
          >
            Career Impact &amp; Trajectory
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: '24px',
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: '#131b2e',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '25px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <Skeleton
                variant="rounded"
                width={40}
                height={40}
                sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
              />
              <Skeleton
                variant="rounded"
                width="65%"
                height={20}
                sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={14}
                sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
              />
              <Skeleton
                variant="rounded"
                width="85%"
                height={14}
                sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
              />
              <Box sx={{ pt: '4px' }}>
                <Skeleton
                  variant="rounded"
                  width="50%"
                  height={12}
                  sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  const impacts = careerImpacts ?? [];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        py: '32px',
        width: '100%',
      }}
    >
      {/* Section heading */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: { xs: '36px', md: '48px' },
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            textAlign: 'center',
          }}
        >
          Career Impact &amp; Trajectory
        </Typography>
      </Box>

      {/* Cards grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: '24px',
        }}
      >
        {impacts.map((card) => (
          <Box
            key={card.id}
            sx={{
              backgroundColor: '#131b2e',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '8px',
              padding: '25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '4px',
                backgroundColor: 'rgba(0,219,233,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {card.icon_url && !failedImages.has(card.id) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.icon_url}
                  alt={card.title}
                  style={{ width: 24, height: 24, objectFit: 'contain' }}
                  onError={() => setFailedImages((prev) => new Set(prev).add(card.id))}
                />
              ) : (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#00dbe9',
                    opacity: 0.3,
                  }}
                />
              )}
            </Box>

            {/* Title */}
            <Box sx={{ pt: '8px' }}>
              <Typography
                component="h4"
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '28px',
                  color: '#dae2fd',
                }}
              >
                {card.title}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#b9cacb',
                fontStyle: 'normal',
              }}
            >
              {card.description}
            </Typography>

            {/* Quote */}
            <Box sx={{ pt: '16px' }}>
              <Typography
                sx={{
                  fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#00dbe9',
                  fontStyle: 'normal',
                }}
              >
                {card.quote}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
