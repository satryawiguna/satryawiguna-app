'use client';

import { Box, Chip, Typography } from '@mui/material';

export function BlogHero() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14.8px',
        pt: '80px',
        pb: '0',
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
          label="Continuous Learning & Knowledge Sharing"
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

      {/* Title */}
      <Box sx={{ pt: '9.2px' }}>
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '40px', md: '64px' },
            lineHeight: { xs: '48px', md: '70.4px' },
            letterSpacing: '-1.28px',
            color: '#dbfcff',
            textAlign: 'center',
            whiteSpace: { xs: 'normal', md: 'nowrap' },
          }}
        >
          Engineering{' '}
          <Box component="span" sx={{ color: '#006970' }}>
            Insights
          </Box>
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '30.6px',
          color: '#b9cacb',
          textAlign: 'center',
          maxWidth: '672px',
        }}
      >
        Thoughts, case studies, and practical lessons from building scalable software, cloud-native
        systems, and modern web applications.
      </Typography>
    </Box>
  );
}
