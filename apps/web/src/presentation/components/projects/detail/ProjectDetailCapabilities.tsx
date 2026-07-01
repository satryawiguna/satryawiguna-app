'use client';

import { Box, Typography } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import TimelineIcon from '@mui/icons-material/Timeline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LanIcon from '@mui/icons-material/Lan';
import ApiIcon from '@mui/icons-material/Api';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ExtensionIcon from '@mui/icons-material/Extension';
import CloudIcon from '@mui/icons-material/Cloud';
import LanguageIcon from '@mui/icons-material/Language';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import DevicesIcon from '@mui/icons-material/Devices';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HubIcon from '@mui/icons-material/Hub';
import type { SvgIconComponent } from '@mui/icons-material';
import type { Project } from '@/data/projects';

const iconMap: Record<string, SvgIconComponent> = {
  Speed: SpeedIcon,
  Timeline: TimelineIcon,
  Psychology: PsychologyIcon,
  ShowChart: ShowChartIcon,
  Lan: LanIcon,
  Api: ApiIcon,
  FlashOn: FlashOnIcon,
  Extension: ExtensionIcon,
  Cloud: CloudIcon,
  Language: LanguageIcon,
  FilterAlt: FilterAltIcon,
  Notifications: NotificationsIcon,
  Security: SecurityIcon,
  BugReport: BugReportIcon,
  EnhancedEncryption: EnhancedEncryptionIcon,
  Devices: DevicesIcon,
  VisibilityOff: VisibilityOffIcon,
};

interface ProjectDetailCapabilitiesProps {
  project: Project;
}

export function ProjectDetailCapabilities({ project }: ProjectDetailCapabilitiesProps) {
  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        pt: '81px',
        pb: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        width: '100%',
      }}
    >
      {/* Heading */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: { xs: '28px', md: '40px' },
          lineHeight: '48px',
          letterSpacing: '-0.4px',
          color: '#dae2fd',
          textAlign: 'center',
          width: '100%',
        }}
      >
        CORE CAPABILITIES
      </Typography>

      {/* Capability cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: '24px',
          width: '100%',
        }}
      >
        {project.capabilities.map((cap) => {
          const IconComponent = iconMap[cap.icon] ?? HubIcon;
          return (
            <Box
              key={cap.title}
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: '49px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Box sx={{ color: '#00f0ff' }}>
                <IconComponent sx={{ fontSize: '40px' }} />
              </Box>

              <Typography
                component="h3"
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '28px',
                  lineHeight: '36.4px',
                  color: '#dae2fd',
                  textAlign: 'center',
                  mt: '8px',
                }}
              >
                {cap.title}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#94a3b8',
                  textAlign: 'center',
                }}
              >
                {cap.description}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
