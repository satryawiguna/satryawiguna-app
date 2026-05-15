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
        Technical Philosophy
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
        My engineering approach is rooted in{' '}
        <Box component="span" sx={{ fontWeight: 600 }}>
          Modularity
        </Box>{' '}
        and{' '}
        <Box component="span" sx={{ fontWeight: 600 }}>
          Evidence-Based Development
        </Box>
        . I champion an{' '}
        <Box component="span" sx={{ fontWeight: 600 }}>
          API-First Strategy
        </Box>
        , ensuring that software isn&apos;t just a solution, but a resilient asset designed for
        long-term scalability and seamless integration.
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
            Modularity
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
            API-First
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
            Evidence-Based
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
