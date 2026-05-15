import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectDetailTechStackProps {
  project: Project;
}

export function ProjectDetailTechStack({ project }: ProjectDetailTechStackProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#020617',
        py: '80px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          maxWidth: '1280px',
          px: '32px',
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Label */}
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '1.6px',
            color: '#64748b',
            textAlign: 'center',
            width: '100%',
          }}
        >
          ENGINEERED WITH
        </Typography>

        {/* Tech pills */}
        <Box
          sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {project.techStackDetailed.map((tech) => (
            <Box
              key={tech.name}
              sx={{
                backgroundColor: '#222a3d',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                px: '25px',
                py: '17px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Box sx={{ position: 'relative', width: 24, height: 24, flexShrink: 0 }}>
                <Image src={tech.icon} alt={tech.name} fill style={{ objectFit: 'contain' }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Nimbus Mono PS, monospace',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '19.5px',
                  color: '#dae2fd',
                  whiteSpace: 'nowrap',
                }}
              >
                {tech.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
