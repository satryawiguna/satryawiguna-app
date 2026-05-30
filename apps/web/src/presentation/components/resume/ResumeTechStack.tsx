'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useSkills } from '@/presentation/hooks';

export function ResumeTechStack() {
  const { data: skills = [], isLoading } = useSkills({ sortBy: 'level', orderBy: 'desc' });
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
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Skeleton
                    variant="rounded"
                    width={140}
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={32}
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}
                  />
                </Box>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={8}
                  sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}
                />
              </Box>
            ))
          : skills.map((skill) => (
              <Box key={skill.id} sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* Label + percentage row */}
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Nimbus Mono PS, monospace',
                      fontSize: '13px',
                      lineHeight: '19.5px',
                      color: '#dae2fd',
                    }}
                  >
                    {skill.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Nimbus Mono PS, monospace',
                      fontSize: '13px',
                      lineHeight: '19.5px',
                      color: '#00dbe9',
                    }}
                  >
                    {skill.level}%
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
                      width: `${skill.level}%`,
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
