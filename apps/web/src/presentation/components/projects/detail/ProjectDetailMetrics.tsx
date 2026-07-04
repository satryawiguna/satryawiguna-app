'use client';

import { Box, Typography } from '@mui/material';
import type { ProjectMetric } from '@/data/projects';

interface ProjectDetailMetricsProps {
  metrics: ProjectMetric[];
}

export function ProjectDetailMetrics({ metrics }: ProjectDetailMetricsProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        p: '25px',
        display: 'grid',
        gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
        gap: '24px',
        width: '100%',
      }}
    >
      {metrics.map((metric, index) => (
        <Box
          key={metric.label}
          sx={{
            borderLeft: index > 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            pl: index > 0 ? '1px' : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '28px', md: '40px' },
              lineHeight: '48px',
              letterSpacing: '-0.4px',
              color: '#00f0ff',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {metric.value}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '11px', md: '16px' },
              lineHeight: '24px',
              color: '#64748b',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {metric.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
