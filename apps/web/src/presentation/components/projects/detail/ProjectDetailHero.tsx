'use client';

import { Box, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import type { Project } from '@/data/projects';

interface ProjectDetailHeroProps {
  project: Project;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Back to Projects */}
      <Link href="/projects" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: 'fit-content',
            '&:hover .back-text': { color: '#00dbe9' },
          }}
        >
          <ArrowBackIcon sx={{ color: '#00f0ff', fontSize: '16px' }} />
          <Typography
            className="back-text"
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#00f0ff',
              transition: 'color 0.2s ease',
            }}
          >
            BACK TO PROJECTS
          </Typography>
        </Box>
      </Link>

      {/* Title row + CTA buttons */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: '48px',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        {/* Left: title + badges */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            {project.title.toUpperCase()}
          </Typography>

          <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Box
              sx={{
                backgroundColor: '#222a3d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                px: '17px',
                py: '5px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#dae2fd',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.role}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#222a3d',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                px: '17px',
                py: '5px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#dae2fd',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.period}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right: action buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            alignItems: 'flex-end',
            height: '58px',
          }}
        >
          {project.liveSiteUrl && (
            <Link
              href={project.liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#00f0ff',
                  px: '24px',
                  py: '17px',
                  cursor: 'pointer',
                  height: '58px',
                  '&:hover': { backgroundColor: '#00dbe9' },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <OpenInNewIcon sx={{ color: '#006970', fontSize: '20px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#006970',
                    whiteSpace: 'nowrap',
                  }}
                >
                  VIEW LIVE SITE
                </Typography>
              </Box>
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #00f0ff',
                  px: '25px',
                  py: '17px',
                  cursor: 'pointer',
                  height: '58px',
                  '&:hover': { backgroundColor: 'rgba(0, 240, 255, 0.05)' },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <CodeIcon sx={{ color: '#00f0ff', fontSize: '20px' }} />
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#00f0ff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  GITHUB REPO
                </Typography>
              </Box>
            </Link>
          )}
        </Box>
      </Box>

      {/* Hero Image */}
      <Box
        sx={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: { xs: '280px', md: '480px', lg: '682px' },
          padding: '1px',
        }}
      >
        <img
          src={project.detailImage}
          alt={project.title}
          style={{
            position: 'absolute',
            width: '100%',
            height: '178%',
            top: '-39%',
            left: 0,
            objectFit: 'cover',
            maxWidth: 'none',
            opacity: 0.8,
          }}
        />
        {/* Bottom fade gradient */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, #020617 0%, rgba(2,6,23,0) 100%)',
          }}
        />
      </Box>
    </Box>
  );
}
