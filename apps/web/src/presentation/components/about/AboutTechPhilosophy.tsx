'use client';

import { Box, Typography } from '@mui/material';

export function AboutTechPhilosophy() {
  return (
    <Box
      sx={{
        backgroundColor: '#131b2e',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '8px',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      {/* Heading */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '36.4px',
          color: '#dae2fd',
        }}
      >
        Engineering Philosophy
      </Typography>

      {/* Body text */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '25.6px',
          color: '#b9cacb',
          fontStyle: 'normal',
        }}
      >
        I believe great software is more than working code, it should be{' '}
        <Box component="span" sx={{ fontWeight: 600 }}>
          maintainable, scalable, and aligned with business objectives.
        </Box>
        My engineering philosophy combines pragmatic architecture, performance-first thinking, and
        continuous improvement to build systems that stand the test of time.
      </Typography>

      {/* Tags */}
      <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', pt: '8px' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(0,219,233,0.1)',
            border: '1px solid rgba(0,219,233,0.2)',
            borderRadius: '12px',
            px: '17px',
            py: '9px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#00dbe9',
              whiteSpace: 'nowrap',
            }}
          >
            Scalable Architecture
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(78,222,163,0.1)',
            border: '1px solid rgba(78,222,163,0.2)',
            borderRadius: '12px',
            px: '17px',
            py: '9px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#4edea3',
              whiteSpace: 'nowrap',
            }}
          >
            Performance Engineering
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(210,187,255,0.1)',
            border: '1px solid rgba(210,187,255,0.2)',
            borderRadius: '12px',
            px: '17px',
            py: '9px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#d2bbff',
              whiteSpace: 'nowrap',
            }}
          >
            Business Driven
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(210,187,255,0.1)',
            border: '1px solid rgba(210,187,255,0.2)',
            borderRadius: '12px',
            px: '17px',
            py: '9px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#d2bbff',
              whiteSpace: 'nowrap',
            }}
          >
            Maintainability
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
