'use client';

import { Box, Typography } from '@mui/material';
import { useContactDrawer } from '@/presentation/components/home/ContactDrawerContext';
import type { Project } from '@/data/projects';

interface ProjectDetailCTAProps {
  project: Project;
}

export function ProjectDetailCTA({ project }: ProjectDetailCTAProps) {
  const { openDrawer } = useContactDrawer();
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '22.8px',
        p: { xs: '48px 32px', md: '81px' },
        width: '100%',
      }}
    >
      {/* Glow effects matching the Figma design */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 256,
          height: 256,
          backgroundColor: 'rgba(0, 240, 255, 0.1)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 256,
          height: 256,
          backgroundColor: 'rgba(78, 222, 163, 0.1)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Heading */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: { xs: '24px', md: '40px' },
          lineHeight: { xs: '32px', md: '48px' },
          letterSpacing: '-0.4px',
          color: '#dae2fd',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.ctaTitle}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '30.6px',
          color: '#94a3b8',
          textAlign: 'center',
          maxWidth: '672px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.ctaDescription}
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: '24px',
          mt: '2.2px',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Schedule a tech demo */}
        <Box
          onClick={openDrawer}
          sx={{
            backgroundColor: '#00f0ff',
            px: '80px',
            py: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': { backgroundColor: '#00dbe9' },
            transition: 'background-color 0.2s ease',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '1.6px',
              color: '#006970',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            SCHEDULE A TECH DEMO
          </Typography>
        </Box>

        {/* Download whitepaper */}
        <Box
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            px: '81px',
            py: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.4)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '1.6px',
              color: '#dae2fd',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            DOWNLOAD WHITEPAPER
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
