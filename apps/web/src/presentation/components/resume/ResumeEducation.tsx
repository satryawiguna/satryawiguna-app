'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useEducations } from '@/presentation/hooks';

export function ResumeEducation() {
  const { data: educations = [], isLoading } = useEducations();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Section heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '22px', height: '18px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-graduation.svg"
            alt=""
            fill
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: '48px',
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          EDUCATION
        </Typography>
      </Box>

      {/* Education cards — horizontal wrapped */}
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px' }}>
        {isLoading ? (
          <Box
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              p: '25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flex: '1 1 280px',
              minWidth: '240px',
            }}
          >
            <Skeleton
              variant="rounded"
              width="30%"
              height={20}
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
            />
            <Skeleton
              variant="rounded"
              width="85%"
              height={32}
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
            />
            <Skeleton
              variant="rounded"
              width="50%"
              height={20}
              sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
            />
          </Box>
        ) : (
          educations.map((edu) => (
            <Box
              key={edu.id}
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: '25px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                flex: '1 1 280px',
                minWidth: '240px',
              }}
            >
              {/* Year */}
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#4edea3',
                }}
              >
                {edu.start_year} — {edu.end_year ?? 'PRESENT'}
              </Typography>

              {/* Degree */}
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '28px',
                  lineHeight: '36.4px',
                  color: '#dbfcff',
                  pt: '4px',
                }}
              >
                {edu.degree}
              </Typography>

              {/* Institution */}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#b9cacb',
                }}
              >
                {edu.institution}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
