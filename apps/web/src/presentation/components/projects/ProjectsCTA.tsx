'use client';

import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import Link from 'next/link';
import { useContactDrawer } from '@/presentation/components/home/ContactDrawerContext';

export function ProjectsCTA() {
  const { openDrawer } = useContactDrawer();
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(0, 219, 233, 0.2)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: '64px', md: '113px' },
        pb: { xs: '64px', md: '81px' },
        px: { xs: '32px', md: '81px' },
        width: '100%',
      }}
    >
      {/* Heading */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '28px', md: '40px' },
          lineHeight: { xs: '36px', md: '48px' },
          letterSpacing: '-0.4px',
          color: '#dbfcff',
          textAlign: 'center',
        }}
      >
        Ready to initiate a project?
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#b9cacb',
          textAlign: 'center',
          maxWidth: '576px',
          mt: '24px',
        }}
      >
        I am currently open to high-impact roles and freelance partnerships. Let&apos;s build
        something exceptional together.
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: '24px',
          mt: '24px',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
        }}
      >
        {/* Get In Touch */}
        <Box
          onClick={openDrawer}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00f0ff',
            borderRadius: '4px',
            px: '32px',
            py: '17px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#00dbe9',
            },
            transition: 'background-color 0.2s ease',
          }}
        >
          <EmailIcon sx={{ color: '#00363a', fontSize: '16px' }} />
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#00363a',
              whiteSpace: 'nowrap',
            }}
          >
            Get In Touch
          </Typography>
        </Box>

        {/* Download CV */}
        <Link
          href="/assets/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(0, 219, 233, 0.5)',
              borderRadius: '4px',
              px: '33px',
              py: '17px',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'rgba(0, 219, 233, 0.8)',
                backgroundColor: 'rgba(0, 219, 233, 0.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <DownloadIcon sx={{ color: '#00dbe9', fontSize: '16px' }} />
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#00dbe9',
                whiteSpace: 'nowrap',
              }}
            >
              Download CV
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
