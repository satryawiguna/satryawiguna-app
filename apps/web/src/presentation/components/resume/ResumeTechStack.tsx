import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Skill {
  label: string;
  percentage: number;
}

const skills: Skill[] = [
  { label: 'Next.js / React', percentage: 95 },
  { label: 'Node.js / Laravel', percentage: 92 },
  { label: 'PostgreSQL / MySQL', percentage: 90 },
  { label: 'AWS / CI/CD', percentage: 85 },
  { label: 'Python / .NET Core', percentage: 56 },
  { label: 'MongoDB', percentage: 53 },
];

export function ResumeTechStack() {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        p: '49px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '20px', height: '16px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-tech.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '-0.18px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          TECH STACK
        </Typography>
      </Box>

      {/* Skills list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {skills.map((skill) => (
          <Box key={skill.label} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Label + percentage row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                sx={{
                  fontFamily: 'Nimbus Mono PS, monospace',
                  fontSize: '13px',
                  lineHeight: '19.5px',
                  color: '#dae2fd',
                }}
              >
                {skill.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Nimbus Mono PS, monospace',
                  fontSize: '13px',
                  lineHeight: '19.5px',
                  color: '#00dbe9',
                }}
              >
                {skill.percentage}%
              </Typography>
            </Box>

            {/* Progress bar */}
            <Box
              sx={{
                width: '100%',
                height: '8px',
                borderRadius: '12px',
                backgroundColor: '#2d3449',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${skill.percentage}%`,
                  backgroundColor: '#00f0ff',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
