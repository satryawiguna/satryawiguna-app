import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

function ProjectCard({ project }: { project: Project }) {
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
            src={project.image}
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
          <Box
            sx={{
              display: 'inline-flex',
              backgroundColor: project.category.bgColor,
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
                color: project.category.textColor,
                whiteSpace: 'nowrap',
              }}
            >
              {project.category.label}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            component="h3"
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

          {/* Description */}
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#b9cacb',
              mt: '16px',
            }}
          >
            {project.description}
          </Typography>

          {/* Tech stack */}
          <Box sx={{ display: 'flex', gap: '8px', mt: '32px', flexWrap: 'wrap' }}>
            {project.techStack.map((tech) => (
              <Box
                key={tech}
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
                  {tech}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export function ProjectsGrid() {
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
