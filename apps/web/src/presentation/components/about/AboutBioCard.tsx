'use client';

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
        Professional Journey
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
          My software engineering journey began in 2002, starting with{' '}
          <Box component="span" sx={{ color: '#00dbe9' }}>
            computer hardware , networking, and web development
          </Box>{' '}
          before evolving into enterprise software engineering and technical leadership. Over the
          past two decades,{' '}
          <Box component="span" sx={{ color: '#dae2fd', fontWeight: 500 }}>
            I&apos;ve partnered with startups, multinational companies, and global engineering teams
          </Box>
          to build scalable platforms across healthcare, education, CRM, event management, AI, and
          analytics. Today I focus on software architecture, engineering leadership, performance
          optimization, and AI-native development, helping businesses build software that remains
          reliable, scalable, and maintainable as they grow.
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
          Based in Bali, Indonesia, I work remotely with international engineering teams while
          maintaining a healthy balance between technology, family, and continuous learning.
        </Typography>
      </Box>
    </Box>
  );
}
