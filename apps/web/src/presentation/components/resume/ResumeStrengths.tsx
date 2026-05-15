import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const strengths = [
  'System Architecture & Scalability',
  'Problem Solving & Performance Optimization',
  'Team Leadership & Collaboration',
];

export function ResumeStrengths() {
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
        <Box sx={{ position: 'relative', width: '19px', height: '20px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-strengths.svg"
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
          STRENGTHS
        </Typography>
      </Box>

      {/* Strengths list */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {strengths.map((item) => (
          <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Box
              sx={{
                position: 'relative',
                width: '13.3px',
                height: '17.3px',
                flexShrink: 0,
                mt: '3px',
              }}
            >
              <Image
                src="/assets/icons/resume/icon-check.svg"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#dae2fd',
              }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
