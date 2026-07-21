'use client';

import { Box, Button, Chip, Typography } from '@mui/material';
import Image from 'next/image';

interface ResumeHeroProps {
  resumeFileUrl?: string | null;
}

export function ResumeHero({ resumeFileUrl }: ResumeHeroProps) {
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
            label="Available for Hire"
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
          Professional Experience
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
          Lead Software Engineer with 20+ years of experience designing scalable software
          architectures, leading engineering teams, and delivering high-performance web platforms.
          Experienced across the JavaScript ecosystem, including Next.js, React, Node.js, NestJS,
          and Laravel, with a strong focus on performance engineering, system architecture, and
          AI-native development practices.
        </Typography>
      </Box>

      {/* Right: Download button */}
      <Button
        href={resumeFileUrl || '/assets/resume.pdf'}
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
          alt="Download resume"
          width={16}
          height={16}
          style={{ objectFit: 'contain' }}
        />
        Download Resume (PDF)
      </Button>
    </Box>
  );
}
