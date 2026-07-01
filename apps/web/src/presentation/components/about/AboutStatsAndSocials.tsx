'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export function AboutStatsAndSocials() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Stats grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {/* 20+ Years */}
        <Box
          sx={{
            backgroundColor: '#222a3d',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '4px',
            padding: '17px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: '28px',
              lineHeight: '36.4px',
              letterSpacing: '-1.4px',
              color: '#4edea3',
              textAlign: 'center',
              mb: '-0.11px',
            }}
          >
            20+
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#b9cacb',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            YEARS IN TECH
          </Typography>
        </Box>

        {/* 500k+ */}
        <Box
          sx={{
            backgroundColor: '#222a3d',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '4px',
            padding: '17px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: '28px',
              lineHeight: '36.4px',
              letterSpacing: '-1.4px',
              color: '#00dbe9',
              textAlign: 'center',
              mb: '-0.11px',
            }}
          >
            500k+
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#b9cacb',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            DAILY ACTIVE USERS
          </Typography>
        </Box>
      </Box>

      {/* The Network card */}
      <Box
        sx={{
          backgroundColor: '#131b2e',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '8px',
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '12px',
            letterSpacing: '1.2px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          The Network
        </Typography>

        {/* Social links grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          {/* GitHub */}
          <Box
            component="a"
            href="https://github.com/satryawiguna"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: 'rgba(45,52,73,0.3)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '4px',
              padding: '17px',
              height: '58px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              '&:hover': { backgroundColor: 'rgba(45,52,73,0.5)' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#dae2fd',
                fontStyle: 'normal',
              }}
            >
              GitHub
            </Typography>
            <Box sx={{ width: '9.333px', height: '9.333px', position: 'relative', flexShrink: 0 }}>
              <Image
                src="/assets/about/icon-arrow.svg"
                alt="Arrow"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>

          {/* LinkedIn */}
          <Box
            component="a"
            href="https://linkedin.com/in/satryawiguna"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: 'rgba(45,52,73,0.3)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '4px',
              padding: '17px',
              height: '58px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              '&:hover': { backgroundColor: 'rgba(45,52,73,0.5)' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#dae2fd',
                fontStyle: 'normal',
              }}
            >
              LinkedIn
            </Typography>
            <Box sx={{ width: '9.333px', height: '9.333px', position: 'relative', flexShrink: 0 }}>
              <Image
                src="/assets/about/icon-arrow.svg"
                alt="Arrow"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
