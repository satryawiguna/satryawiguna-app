import { Box, Typography } from '@mui/material';

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
      {/* Status badge */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '12px',
            backgroundColor: '#4edea3',
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '12px',
            color: '#4edea3',
            letterSpacing: '1.2px',
          }}
        >
          SYSTEM ONLINE / SENIOR FULL STACK ARCHITECT
        </Typography>
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
          &ldquo;8+ years of engineering digital ecosystems&rdquo; &mdash; based in Bali, architecting
          scalable solutions for the global network.
        </Typography>
      </Box>
    </Box>
  );
}
