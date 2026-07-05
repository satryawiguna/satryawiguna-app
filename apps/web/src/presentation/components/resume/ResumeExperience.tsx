'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useExperiences } from '@/presentation/hooks';

// ── Helpers ───────────────────────────────────────────────────

function formatPeriod(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const startStr = `${String(start.getMonth() + 1).padStart(2, '0')}/${start.getFullYear()}`;
  if (!endDate) return `${startStr} — PRESENT`;
  const end = new Date(endDate);
  const endStr = `${String(end.getMonth() + 1).padStart(2, '0')}/${end.getFullYear()}`;
  return `${startStr} — ${endStr}`;
}

const employmentTypeLabels: Record<string, string> = {
  FULL_TIME: 'FULL-TIME',
  PART_TIME: 'PART-TIME',
  CONTRACT: 'CONTRACT',
  FREELANCE: 'FREELANCE',
  INTERNSHIP: 'INTERNSHIP',
};

export function ResumeExperience() {
  const { data: experiences = [], isLoading } = useExperiences();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Section heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box sx={{ position: 'relative', width: '20px', height: '19px', flexShrink: 0 }}>
          <Image
            src="/assets/icons/resume/icon-briefcase.svg"
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
          EXPERIENCE
        </Typography>
      </Box>

      {/* Timeline */}
      <Box
        sx={{
          borderLeft: '1px solid rgba(0, 219, 233, 0.3)',
          pl: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          overflow: 'visible',
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-45px',
                    top: '14px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(132, 148, 149, 0.3)',
                    boxShadow: '0 0 0 4px rgba(132,148,149,0.1)',
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    p: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    width="60%"
                    height={28}
                    sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                  />
                  <Skeleton
                    variant="rounded"
                    width="40%"
                    height={16}
                    sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                  />
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={48}
                    sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                  />
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton
                        key={j}
                        variant="rounded"
                        width={60}
                        height={32}
                        sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))
          : experiences.map((exp) => {
              const isCurrent = !exp.end_date;
              return (
                <Box key={exp.id} sx={{ position: 'relative' }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '-45px',
                      top: '14px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? '#00dbe9' : 'rgba(132, 148, 149, 0.5)',
                      boxShadow: isCurrent
                        ? '0 0 0 4px rgba(0,219,233,0.2), 0 0 10px 0 rgba(0,219,233,0.4)'
                        : '0 0 0 4px rgba(132,148,149,0.1)',
                    }}
                  />

                  {/* Card */}
                  <Box
                    sx={{
                      backgroundColor: 'rgba(15, 23, 42, 0.4)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      p: '25px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    {/* Title row */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: 500,
                            fontSize: { xs: '20px', md: '28px' },
                            lineHeight: '36.4px',
                            color: '#dbfcff',
                          }}
                        >
                          {exp.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: 'Nimbus Mono PS, monospace',
                            fontSize: '13px',
                            lineHeight: '19.5px',
                            color: '#4edea3',
                          }}
                        >
                          {exp.company} • {formatPeriod(exp.start_date, exp.end_date)}
                        </Typography>
                      </Box>
                      {exp.employment_type && (
                        <Box
                          sx={{
                            backgroundColor: '#2d3449',
                            borderRadius: '2px',
                            px: '16px',
                            py: '8px',
                            flexShrink: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Space Grotesk, sans-serif',
                              fontWeight: 400,
                              fontSize: '16px',
                              lineHeight: '24px',
                              color: '#b9cacb',
                            }}
                          >
                            {employmentTypeLabels[exp.employment_type] ?? exp.employment_type}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#b9cacb',
                      }}
                    >
                      {exp.description}
                    </Typography>

                    {/* Tags (skills) */}
                    {exp.skills && exp.skills.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', pt: '8px' }}>
                        {exp.skills.map((skill) => (
                          <Box
                            key={skill.id}
                            sx={{
                              backgroundColor: 'rgba(219, 252, 255, 0.1)',
                              borderRadius: '2px',
                              px: '16px',
                              py: '8px',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Nimbus Mono PS, monospace',
                                fontSize: '12px',
                                lineHeight: '16px',
                                color: '#00dbe9',
                              }}
                            >
                              {skill.name}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
}
