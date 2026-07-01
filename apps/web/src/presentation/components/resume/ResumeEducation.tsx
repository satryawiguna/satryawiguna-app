'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export function ResumeEducation() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Section heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '22px', height: '18px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-graduation.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: '48px',
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          EDUCATION
        </Typography>
      </Box>

      {/* Education card */}
      <Box
        sx={{
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          p: '25px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          maxWidth: { xs: '100%', md: '389px' },
        }}
      >
        {/* Year */}
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#4edea3',
          }}
        >
          2001 — 2006
        </Typography>

        {/* Degree */}
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '36.4px',
            color: '#dbfcff',
            pt: '4px',
          }}
        >
          Bachelor of Electrical Engineering
        </Typography>

        {/* Institution */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#b9cacb',
          }}
        >
          Udayana University
        </Typography>
      </Box>
    </Box>
  );
}
