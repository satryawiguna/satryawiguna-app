'use client';

import { Box, Button, Chip, Container, Typography, Grid, Skeleton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { useSkills } from '@/presentation/hooks';

export function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="xl">
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
                  label="AVAILABLE FOR NEW PROJECTS"
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
                  fontSize: { xs: '32px', sm: '40px', md: '64px' },
                  letterSpacing: '-1.28px',
                  lineHeight: 1.1,
                  maxWidth: '576px',
                  color: '#dbfcff',
                  mb: 3,
                }}
              >
                Engineering{' '}
                <Box component="span" sx={{ color: '#00dbe9' }}>
                  High
                </Box>
                <br />
                <Box component="span" sx={{ color: '#00dbe9' }}>
                  Performance
                </Box>
                <br />
                Web Ecosystems
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
                Full-Stack Developer and Team Lead specializing in scalable architectures, database
                optimization, and modern JavaScript/PHP frameworks. I turn complex enterprise
                requirements into seamless digital products.
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
                  View Projects
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
                  Download CV
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
              {/* Animated Glowing Grid Background */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(0, 219, 233, 0.067) 2.5%, transparent 2.5%), linear-gradient(180deg, rgba(0, 219, 233, 0.067) 2.5%, transparent 2.5%)',
                  backgroundSize: '40px 40px',
                  opacity: 0.2,
                }}
              />

              {/* Thematic Gradient Glow */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '-80px',
                  width: '500px',
                  height: '500px',
                  backgroundColor: 'rgba(0, 219, 233, 0.1)',
                  borderRadius: '12px',
                  filter: 'blur(60px)',
                  transform: 'translateY(-50%)',
                }}
              />

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
  const { data: skills = [], isLoading } = useSkills({ sortBy: 'sort_order', orderBy: 'asc' });

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
        <Box sx={{ position: 'relative', opacity: 0.8 }}>
          {/* Skeleton Row 1 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              mb: { xs: 2, md: 3 },
              flexWrap: 'wrap',
            }}
          >
            {skeletonItems.slice(0, 7).map((_, i) => (
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
          {/* Skeleton Row 2 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              flexWrap: 'wrap',
            }}
          >
            {skeletonItems.slice(7).map((_, i) => (
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
      </Box>
    );
  }

  if (skills.length === 0) return null;

  const midpoint = Math.ceil(skills.length / 2);
  const firstRow = skills.slice(0, midpoint);
  const secondRow = skills.slice(midpoint);

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
      <Box sx={{ position: 'relative', opacity: 0.8 }}>
        {/* First Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            mb: { xs: 2, md: 3 },
            flexWrap: 'wrap',
          }}
        >
          {firstRow.map((skill) => (
            <Box
              key={skill.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
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
                }}
              >
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Second Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, md: 4 },
            flexWrap: 'wrap',
          }}
        >
          {secondRow.map((skill) => (
            <Box
              key={skill.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
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
                  fontSize: { xs: '12px', md: '14px' },
                  color: '#dae2fd',
                  lineHeight: '20px',
                }}
              >
                {skill.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
