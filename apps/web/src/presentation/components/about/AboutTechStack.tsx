'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import { useSkills } from '@/presentation/hooks';

export function AboutTechStack() {
  const { data: skills = [], isLoading } = useSkills({ sortBy: 'sort_order', orderBy: 'asc' });

  return (
    <Box
      sx={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        pt: '49px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: '16px', md: '32px' },
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Skeleton
                  variant="circular"
                  width={22}
                  height={22}
                  sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
                />
                <Skeleton
                  variant="rounded"
                  width={130}
                  height={16}
                  sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}
                />
              </Box>
            ))
          : skills.map((skill) => (
              <Box
                key={skill.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {skill.icon_url && (
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={skill.icon_url}
                      alt={skill.name}
                      sx={{ width: 22, height: 22, objectFit: 'contain' }}
                    />
                  </Box>
                )}
                <Typography
                  sx={{
                    fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#dae2fd',
                    whiteSpace: 'nowrap',
                    fontStyle: 'normal',
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
