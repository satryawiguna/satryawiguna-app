'use client';

import { Box, Chip, Typography } from '@mui/material';

export function AboutHero() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.8px',
        width: '100%',
      }}
    >
      {/* Status Badge */}
      <Box sx={{ mb: 1 }}>
        <Chip
          icon={
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#4edea3',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: '#4edea3',
                  opacity: 0.75,
                  filter: 'blur(4px)',
                },
              }}
            />
          }
          label="Software Architect & Engineer"
          sx={{
            backgroundColor: 'rgba(0, 165, 114, 0.1)',
            border: '1px solid rgba(0, 165, 114, 0.2)',
            color: '#4edea3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '1.2px',
            px: 1.5,
            py: 0.5,
          }}
        />
      </Box>

      {/* H1 */}
      <Box sx={{ pt: '13.2px', width: '100%' }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '40px', md: '64px' },
            lineHeight: { xs: '1.1', md: '70.4px' },
            letterSpacing: '-1.28px',
            color: '#dae2fd',
          }}
        >
          Satrya Wiguna.
        </Typography>
      </Box>

      {/* Tagline */}
      <Box sx={{ maxWidth: '672px' }}>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '30.6px',
            color: '#b9cacb',
            fontStyle: 'normal',
          }}
        >
          20+ years of engineering scalable software platforms, leading distributed development
          teams, and delivering high-performance solutions for businesses across Asia and Europe.
          Based in Bali, collaborating globally.
        </Typography>
      </Box>
    </Box>
  );
}
