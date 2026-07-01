'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

export function ResumeHero() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'flex-end' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 4, md: 3 },
      }}
    >
      {/* Left: Badge + Title + Description */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* AVAILABLE FOR WORK badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '4px' }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
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
            AVAILABLE FOR WORK
          </Typography>
        </Box>

        {/* Resume.exe heading */}
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '40px', md: '64px' },
            lineHeight: { xs: '1.1', md: '70.4px' },
            letterSpacing: '-1.28px',
            color: '#dbfcff',
          }}
        >
          Resume.exe
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '30.6px',
            color: '#b9cacb',
            maxWidth: '896px',
            mt: '4px',
          }}
        >
          Full Stack Developer with over 20 years of professional experience in developing
          high-performance web and mobile applications. My expertise spans the JavaScript ecosystem
          including Next.js, React.js &amp; React Native, and I am proficient in Laravel, Node.js,
          Nest.js, and .NET Core.
        </Typography>
      </Box>

      {/* Right: Download button */}
      <Button
        href="/assets/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          border: '1px solid #00f0ff',
          borderRadius: '4px',
          px: '49px',
          py: '17px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#00f0ff',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          '&:hover': { backgroundColor: 'rgba(0, 240, 255, 0.05)' },
        }}
      >
        <Image
          src="/assets/icons/resume/icon-download.svg"
          alt=""
          width={16}
          height={16}
          style={{ objectFit: 'contain' }}
        />
        DOWNLOAD PDF RESUME
      </Button>
    </Box>
  );
}
