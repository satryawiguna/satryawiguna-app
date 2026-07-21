'use client';

import { Box, Typography } from '@mui/material';
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

// ── Card component ──────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const category = project.categories?.[0];
  const colors = category ? getCategoryColors(category.slug) : CATEGORY_PALETTE[0];
  const skills = project.skills?.map((s) => s.name) ?? [];

  return (
    <Link
      href={`/projects/${project.id}/detail`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          isolation: 'isolate',
          padding: '1px',
        }}
      >
        {/* Image */}
        <Box
          sx={{
            height: '192px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '7px 7px 0 0',
            flexShrink: 0,
          }}
        >
          <img
            src={project.thumbnail_url}
            alt={project.title}
            style={{
              position: 'absolute',
              width: '100%',
              height: '201.73%',
              top: '-50.87%',
              left: 0,
              objectFit: 'cover',
              maxWidth: 'none',
            }}
          />
          {/* Gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11,19,38,0.8) 0%, rgba(11,19,38,0) 100%)',
            }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ p: '24px', display: 'flex', flexDirection: 'column' }}>
          {/* Category tag */}
          {category && (
            <Box
              sx={{
                display: 'inline-flex',
                backgroundColor: colors.bgColor,
                px: '8px',
                py: '4px',
                borderRadius: '2px',
                alignSelf: 'flex-start',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '15px',
                  color: colors.textColor,
                  whiteSpace: 'nowrap',
                }}
              >
                {category.name.toUpperCase()}
              </Typography>
            </Box>
          )}

          {/* Title */}
          <Typography
            component="h2"
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: '28px',
              lineHeight: '36.4px',
              color: '#ffffff',
              mt: '16px',
            }}
          >
            {project.title}
          </Typography>

          {/* Subtitle */}
          {project.sub_title && (
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#8899aa',
                mt: '4px',
              }}
            >
              {project.sub_title}
            </Typography>
          )}

          {/* Description */}
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#b9cacb',
              mt: '12px',
            }}
          >
            {project.description}
          </Typography>

          {/* Skills as tech tags */}
          {skills.length > 0 && (
            <Box sx={{ display: 'flex', gap: '8px', mt: '32px', flexWrap: 'wrap' }}>
              {skills.map((skill) => (
                <Box
                  key={skill}
                  sx={{
                    backgroundColor: '#222a3d',
                    px: '8px',
                    py: '4px',
                    borderRadius: '2px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Nimbus Mono PS, monospace',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#4edea3',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {skill}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
}

// ── Grid component ──────────────────────────────────────────────

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: '24px',
        width: '100%',
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Box>
  );
}
