'use client';

import { Box, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import type { Project } from '@/domain/entities';

// ── Deterministic category color generator ──────────────────────

const CATEGORY_PALETTE = [
  { bgColor: 'rgba(0, 105, 112, 0.1)', textColor: '#006970' },
  { bgColor: 'rgba(0, 165, 114, 0.1)', textColor: '#4edea3' },
  { bgColor: 'rgba(227, 210, 255, 0.2)', textColor: '#742fe5' },
  { bgColor: 'rgba(255, 183, 77, 0.15)', textColor: '#ffb74d' },
  { bgColor: 'rgba(100, 181, 246, 0.15)', textColor: '#64b5f6' },
  { bgColor: 'rgba(239, 83, 80, 0.15)', textColor: '#ef5350' },
];

function getCategoryColors(slug: string) {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length];
}

interface ProjectDetailHeroProps {
  project: Project;
}

export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  const category = project.categories?.[0];
  const colors = category ? getCategoryColors(category.slug) : CATEGORY_PALETTE[0];

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
        {/* Left: title + category badge */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

            {project.sub_title && (
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: '#8899aa',
                }}
              >
                {project.sub_title}
              </Typography>
            )}
          </Box>

          {category && (
            <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  backgroundColor: colors.bgColor,
                  px: '12px',
                  py: '5px',
                  borderRadius: '2px',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: colors.textColor,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {category.name.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          )}
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
          {project.demo_url && (
            <Link
              href={project.demo_url}
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
          {project.repository_url && (
            <Link
              href={project.repository_url}
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
        <Box
          component="img"
          src={project.thumbnail_url}
          alt={project.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
