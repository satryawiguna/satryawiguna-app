'use client';

import { Box, Typography } from '@mui/material';
import type { ProjectSkill } from '@/domain/entities';

interface ProjectDetailSkillsProps {
  skills: ProjectSkill[];
}

export function ProjectDetailSkills({ skills }: ProjectDetailSkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#dbfcff',
          mb: '16px',
        }}
      >
        Technologies
      </Typography>
      <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {skills.map((skill) => (
          <Box
            key={skill.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              px: '12px',
              py: '8px',
            }}
          >
            {skill.icon_url && (
              <Box
                component="img"
                src={skill.icon_url}
                alt={skill.name}
                sx={{ width: '20px', height: '20px', objectFit: 'contain' }}
              />
            )}
            <Typography
              sx={{
                fontFamily: 'Nimbus Mono PS, monospace',
                fontWeight: 400,
                fontSize: '13px',
                color: '#4edea3',
              }}
            >
              {skill.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
