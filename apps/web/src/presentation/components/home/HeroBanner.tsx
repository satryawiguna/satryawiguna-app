'use client';

import { useRef, useEffect } from 'react';
import { Box, Button, Chip, Container, Typography, Grid, Skeleton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import gsap from 'gsap';
import { useSkills } from '@/presentation/hooks';
import { GalaxyBackground } from './GalaxyBackground';

export function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
      }}
    >
      <GalaxyBackground />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Two-column grid layout */}
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Left Column - Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                height: '100%',
              }}
            >
              {/* Status Badge */}
              <Box sx={{ mb: 1 }}>
                <Chip
                  icon={
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#4edea3',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          backgroundColor: '#4edea3',
                          opacity: 0.75,
                          filter: 'blur(4px)',
                        },
                      }}
                    />
                  }
                  label="Software Architect & Engineer"
                  sx={{
                    backgroundColor: 'rgba(0, 165, 114, 0.1)',
                    border: '1px solid rgba(0, 165, 114, 0.2)',
                    color: '#4edea3',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '1.2px',
                    px: 1.5,
                    py: 0.5,
                  }}
                />
              </Box>

              {/* Main Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '26px', sm: '34px', md: '58px' },
                  letterSpacing: '-1.28px',
                  lineHeight: 1.1,
                  maxWidth: '576px',
                  color: '#dbfcff',
                  mb: 3,
                }}
              >
                Engineering{' '}
                <Box component="span" sx={{ color: '#00dbe9' }}>
                  Scalable
                </Box>
                <Box component="span" sx={{ color: '#00dbe9', display: 'block' }}>
                  Software
                </Box>
                That Drives Business Growth
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: { xs: '15px', md: '18px' },
                  lineHeight: 1.7,
                  color: '#b9cacb',
                  maxWidth: '576px',
                  mb: 4,
                }}
              >
                Lead Software Engineer with 20+ years of experience designing scalable
                architectures, optimizing performance, and leading engineering teams. I transform
                complex business requirements into reliable, maintainable, and high-performing
                software products.
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 2, md: 3 },
                  mb: { xs: 0, md: 10 },
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  href="/projects"
                  sx={{
                    backgroundColor: '#00dbe9',
                    color: '#002022',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: '4px',
                    fontSize: { xs: '15px', md: '18px' },
                    fontFamily: 'Space Grotesk, sans-serif',
                    textTransform: 'none',
                    boxShadow:
                      '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      backgroundColor: '#00cad9',
                    },
                  }}
                >
                  Explore Projects
                </Button>

                <Button
                  variant="outlined"
                  href="/resume"
                  sx={{
                    borderColor: '#00dbe9',
                    color: '#00dbe9',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: '4px',
                    fontSize: { xs: '15px', md: '18px' },
                    fontFamily: 'Space Grotesk, sans-serif',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#00cad9',
                      backgroundColor: 'rgba(0, 219, 233, 0.1)',
                    },
                  }}
                >
                  View Resume
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Profile Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '320px', sm: '420px', md: '700px' },
                width: '100%',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              {/* Abstract Geometric Shapes */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '175px',
                  right: 0,
                  width: '256px',
                  height: '256px',
                  border: '1px solid rgba(0, 219, 233, 0.2)',
                  borderRadius: '12px',
                  filter: 'blur(2px)',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '175px',
                  right: '144px',
                  width: '384px',
                  height: '384px',
                  border: '1px solid rgba(0, 219, 233, 0.1)',
                  borderRadius: '12px',
                  filter: 'blur(6px)',
                }}
              />

              {/* Bottom Glow */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: '80px',
                  width: '300px',
                  height: '300px',
                  backgroundColor: 'rgba(78, 222, 163, 0.05)',
                  borderRadius: '12px',
                  filter: 'blur(50px)',
                }}
              />

              {/* Profile Image */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '3px',
                  left: '3px',
                  width: 'calc(100% - 6px)',
                  height: 'calc(100% - 6px)',
                }}
              >
                <Image
                  src="/assets/images/profile.png"
                  alt="Profile"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Tech Stack Section */}
        <TechStackSection />
      </Container>
    </Box>
  );
}

function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: skills = [], isLoading } = useSkills({
    sortBy: 'sort_order',
    orderBy: 'asc',
    level: 50,
    level_operator: 'gte',
  });

  // Border glow animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      '--rotation': '360deg',
      duration: 8,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      gsap.killTweensOf(container);
    };
  }, []);

  if (isLoading) {
    const skeletonItems = Array.from({ length: 14 });
    return (
      <Box
        sx={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          p: { xs: 2, md: 4 },
          mt: { xs: 4, md: 0 },
          position: 'relative',
          overflow: 'hidden',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
          }}
        >
          {skeletonItems.map((_, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton
                variant="circular"
                width={22}
                height={22}
                sx={{ bgcolor: 'rgba(255,255,255,0.08)' }}
              />
              <Skeleton
                variant="rounded"
                width={90}
                height={16}
                sx={{ bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (skills.length === 0) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        p: { xs: 2, md: 4 },
        mt: { xs: 4, md: 0 },
        position: 'relative',
        overflow: 'hidden',
        mx: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          padding: '2px',
          background:
            'conic-gradient(from var(--rotation, 0deg), #00dbe9, #742fe5, #4edea3, #00dbe9)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          opacity: 0.6,
          zIndex: 1,
        },
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 219, 233, 0.05) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Tech Stack Content */}
      <Box
        sx={{
          display: { xs: 'grid', md: 'flex' },
          gridTemplateColumns: { xs: '1fr 1fr', md: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 2, md: 4 },
          flexWrap: { md: 'wrap' },
          position: 'relative',
          opacity: 0.8,
        }}
      >
        {skills.map((skill) => (
          <Box
            key={skill.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              minWidth: 0,
            }}
          >
            {skill.icon_url && (
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={skill.icon_url}
                  alt={skill.name}
                  width={22}
                  height={22}
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            )}
            <Typography
              sx={{
                fontFamily: 'Nimbus Mono PS, monospace',
                fontSize: '14px',
                color: '#dae2fd',
                lineHeight: '20px',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
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
