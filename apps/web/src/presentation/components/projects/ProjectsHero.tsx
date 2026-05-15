import { Box, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

export function ProjectsHero() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 0 },
        width: '100%',
      }}
    >
      {/* Left: Badge + Title + Description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2.8px' }}>
        {/* Status badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '4px' }}>
          <Box sx={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                backgroundColor: '#4edea3',
                opacity: 0.75,
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#4edea3',
                position: 'relative',
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#4edea3',
            }}
          >
            SYSTEMS ONLINE • READY TO BUILD
          </Typography>
        </Box>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '40px', md: '64px' },
            lineHeight: { xs: '1.1', md: '70.4px' },
            letterSpacing: '-1.28px',
            color: '#dbfcff',
            mt: '5.2px',
          }}
        >
          Selected Artifacts
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '30.6px',
            color: '#b9cacb',
            maxWidth: '672px',
            mt: '4px',
          }}
        >
          A curated collection of full-stack engineering projects focusing on high-performance
          architecture, cloud scalability, and refined user experience.
        </Typography>
      </Box>

      {/* Right: Filter button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          px: '17px',
          py: '9px',
          cursor: 'pointer',
          flexShrink: 0,
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        <TuneIcon sx={{ color: '#dae2fd', fontSize: '14px' }} />
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#dae2fd',
          }}
        >
          Filter by Category
        </Typography>
      </Box>
    </Box>
  );
}
