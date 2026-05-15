import { Box, Typography } from '@mui/material';

export function AboutBioCard() {
  return (
    <Box
      sx={{
        backgroundColor: '#171f33',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Decorative blur */}
      <Box
        sx={{
          position: 'absolute',
          top: '-48px',
          right: '-48px',
          width: '128px',
          height: '128px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,219,233,0.05)',
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '28px', md: '40px' },
          lineHeight: { xs: '36px', md: '48px' },
          letterSpacing: '-0.4px',
          color: '#dae2fd',
        }}
      >
        The Journey
      </Typography>

      {/* Bio paragraphs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Para 1 */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#b9cacb',
            fontStyle: 'normal',
          }}
        >
          My career in IT began in 2002 as a{' '}
          <Box component="span" sx={{ color: '#00dbe9' }}>
            computer technician
          </Box>
          , evolving into a Junior Programmer during my university years (B.E. Electrical
          Engineering, 2006). A brief detour into banking as an Account Officer at{' '}
          <Box component="span" sx={{ color: '#dae2fd', fontWeight: 500 }}>
            Bank BRI
          </Box>{' '}
          only solidified my passion for technology, leading me back to software development where I
          truly belong.
        </Typography>

        {/* Para 2 */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#b9cacb',
            fontStyle: 'normal',
          }}
        >
          From independent{' '}
          <Box component="span" sx={{ color: '#4edea3' }}>
            Freelance Leadership
          </Box>{' '}
          for top-tier Bali media groups to architecting regional systems across HK, MY, SG, PH, and
          ID, I&apos;ve dedicated my life to the craft of code.
        </Typography>

        {/* Para 3 — italic */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#b9cacb',
            fontStyle: 'italic',
          }}
        >
          Based in Bali with my wife and two daughters, I prioritize high-impact work that respects
          the balance of a healthy life.
        </Typography>
      </Box>
    </Box>
  );
}
