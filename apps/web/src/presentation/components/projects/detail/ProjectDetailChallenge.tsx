'use client';

import { Box, Typography } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ShieldIcon from '@mui/icons-material/Shield';
import TerminalIcon from '@mui/icons-material/Terminal';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MapIcon from '@mui/icons-material/Map';
import TimelineIcon from '@mui/icons-material/Timeline';
import BoltIcon from '@mui/icons-material/Bolt';
import MemoryIcon from '@mui/icons-material/Memory';
import LockIcon from '@mui/icons-material/Lock';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import type { SvgIconComponent } from '@mui/icons-material';
import type { Project } from '@/data/projects';

const iconMap: Record<string, SvgIconComponent> = {
  Hub: HubIcon,
  Storage: StorageIcon,
  Security: SecurityIcon,
  AccountTree: AccountTreeIcon,
  Shield: ShieldIcon,
  Terminal: TerminalIcon,
  CloudUpload: CloudUploadIcon,
  Map: MapIcon,
  Timeline: TimelineIcon,
  Bolt: BoltIcon,
  Memory: MemoryIcon,
  Lock: LockIcon,
  Speed: SpeedIcon,
  CloudQueue: CloudQueueIcon,
};

interface ProjectDetailChallengeProps {
  project: Project;
}

export function ProjectDetailChallenge({ project }: ProjectDetailChallengeProps) {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
        gap: '48px',
        pt: '81px',
        pb: '80px',
        width: '100%',
      }}
    >
      {/* Left: The Challenge */}
      <Box
        sx={{
          gridColumn: { xs: '1', lg: '1 / span 5' },
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: '48px',
            letterSpacing: '-0.4px',
            color: '#dae2fd',
          }}
        >
          THE CHALLENGE
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '29.25px',
            color: '#94a3b8',
          }}
        >
          {project.challenge}
        </Typography>

        {/* Available for consultation badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4edea3',
              whiteSpace: 'nowrap',
            }}
          >
            AVAILABLE FOR CONSULTATION
          </Typography>
        </Box>
      </Box>

      {/* Right: Architecture */}
      <Box
        sx={{
          gridColumn: { xs: '1', lg: '6 / span 7' },
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: '48px',
            letterSpacing: '-0.4px',
            color: '#dae2fd',
          }}
        >
          ARCHITECTURE
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {project.architectureItems.map((item) => {
            const IconComponent = iconMap[item.icon] ?? HubIcon;
            return (
              <Box
                key={item.title}
                sx={{
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(4px)',
                  border: item.highlighted
                    ? '1px solid #00f0ff'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderLeft: item.highlighted ? '2px solid #00f0ff' : undefined,
                  borderRadius: '4px',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  p: '25px',
                  pl: item.highlighted ? '26px' : '25px',
                }}
              >
                <IconComponent
                  sx={{
                    color: item.highlighted ? '#00f0ff' : '#dae2fd',
                    fontSize: '26px',
                    flexShrink: 0,
                    mt: '4px',
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize: '28px',
                      lineHeight: '36.4px',
                      color: '#dae2fd',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: '#94a3b8',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
