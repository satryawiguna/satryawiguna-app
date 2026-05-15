import { Box, Typography } from '@mui/material';

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
      {/* SYSTEM ONLINE badge */}
      <Box
        sx={{
          backgroundColor: '#131b2e',
          border: '1px solid #3b494b',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          px: '17px',
          py: '9px',
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#4edea3',
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#4edea3',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          SYSTEM ONLINE
        </Typography>
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
          Technical{' '}
          <Box component="span" sx={{ color: '#006970' }}>
            Logs
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
        Exploring the frontiers of full-stack engineering, distributed systems, and modern UI
        architectures.
      </Typography>
    </Box>
  );
}
