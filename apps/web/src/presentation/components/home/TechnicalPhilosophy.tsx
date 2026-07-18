'use client';

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

export function TechnicalPhilosophy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: '96px' },
        position: 'relative',
      }}
    >
      {/* Top Horizontal Divider */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, md: '32px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 4, md: '64px' },
        }}
      >
        {/* Row 1: Left text block + Right two cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
            gap: { xs: 4, md: '48px' },
          }}
        >
          {/* Left: MY JOURNEY badge + heading + paragraphs + location */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '1 / span 6' },
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              justifyContent: 'center',
            }}
          >
            {/* MY JOURNEY badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(0, 219, 233, 0.1)',
                border: '1px solid rgba(0, 219, 233, 0.2)',
                borderRadius: '12px',
                px: '13px',
                py: '5px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '12px',
                  color: '#00dbe9',
                  letterSpacing: '1.2px',
                }}
              >
                MY JOURNEY
              </Typography>
            </Box>

            {/* Heading */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '36px', md: '48px' },
                  lineHeight: { xs: '48px', md: '60px' },
                  color: '#dbfcff',
                }}
              >
                Engineering
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: '36px', md: '48px' },
                  lineHeight: { xs: '48px', md: '60px' },
                  color: '#00dbe9',
                }}
              >
                Philosophy
              </Typography>
            </Box>

            {/* Body text + location card */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '22.9px' }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '29.25px',
                  color: '#dae2fd',
                }}
              >
                Over the past two decades, I&apos;ve partnered with startups, enterprises, and
                international engineering teams to design scalable software solutions that solve
                complex business challenges. My expertise spans software architecture,
                high-performance backend systems, full-stack development, and technical leadership.
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  color: '#b9cacb',
                }}
              >
                I specialize in transforming business ideas into reliable digital products by
                combining sound engineering principles, scalable architecture, performance
                optimization, and modern AI-native development practices.
              </Typography>

              {/* Location card */}
              <Box
                sx={{
                  backgroundColor: '#131b2e',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  px: '17px',
                  pt: '18px',
                  pb: '17px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <Box
                  sx={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'rgba(78, 222, 163, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/assets/icons/icon-location.svg"
                    alt="Location"
                    width={16}
                    height={20}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#dbfcff',
                    }}
                  >
                    Based in Bali, Indonesia
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#b9cacb',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Collaborating with distributed engineering teams across the world.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right: Two feature cards */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '7 / span 6' },
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: '24px',
              position: 'relative',
              alignSelf: 'center',
            }}
          >
            {/* Decorative blur */}
            <Box
              sx={{
                position: 'absolute',
                top: '-48px',
                right: '-48px',
                width: '256px',
                height: '256px',
                backgroundColor: 'rgba(0, 219, 233, 0.05)',
                borderRadius: '12px',
                filter: 'blur(32px)',
                pointerEvents: 'none',
              }}
            />

            {/* Card 1: AI Integration */}
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                pt: '33px',
                px: '33px',
                pb: { xs: '33px', md: '81px' },
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              <Box sx={{ height: '40px', position: 'relative', width: '100%' }}>
                <Image
                  src="/assets/icons/icon-ai.svg"
                  alt="AI Integration"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                />
              </Box>
              <Box sx={{ pt: '9px' }}>
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '28px',
                    color: '#dbfcff',
                  }}
                >
                  AI-Native Engineering
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '22.75px',
                  color: '#b9cacb',
                }}
              >
                Designing AI-powered development workflows that combine LLMs, intelligent agents,
                automation, and human expertise to accelerate software delivery while maintaining
                engineering quality.
              </Typography>
            </Box>

            {/* Card 2: Strategic Leadership (offset 48px down) */}
            <Box
              sx={{
                pt: { xs: 0, sm: '48px' },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  p: '33px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
              >
                <Box sx={{ height: '24px', position: 'relative', width: '100%' }}>
                  <Image
                    src="/assets/icons/icon-leadership.svg"
                    alt="Strategic Leadership"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'left' }}
                  />
                </Box>
                <Box sx={{ pt: '9px' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '28px',
                      color: '#dbfcff',
                    }}
                  >
                    Strategic Leadership
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22.75px',
                    color: '#b9cacb',
                  }}
                >
                  Providing technical direction, mentoring engineering teams, and aligning software
                  architecture with business objectives to deliver scalable, future-ready platforms.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Row 2: Stats + Quote banner */}
        <Box
          sx={{
            background:
              'linear-gradient(171deg, rgba(23,31,51,0.5) 0%, rgba(19,27,46,0.5) 100%), linear-gradient(90deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.6) 100%)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(0, 219, 233, 0.2)',
            borderRadius: '8px',
            p: { xs: '32px', md: '41px' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 3, md: '40px' },
          }}
        >
          {/* Left: 20+ / Years in IT */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              minWidth: { xs: '100px', sm: '120px', md: '160px' },
            }}
          >
            {/* Cyan glow */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#00dbe9',
                filter: 'blur(20px)',
                opacity: 0.2,
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: { xs: '40px', md: '48px' },
                lineHeight: '48px',
                color: '#00dbe9',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              20+
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#b9cacb',
                letterSpacing: '1.2px',
                textAlign: 'center',
                textTransform: 'uppercase',
                position: 'relative',
              }}
            >
              Years in IT
            </Typography>
          </Box>

          {/* Right: Quote + tags */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: { xs: '16px', md: '18px' },
                lineHeight: '28px',
                color: '#dae2fd',
              }}
            >
              &ldquo;Helping organizations build scalable software platforms through pragmatic
              architecture, engineering excellence, and modern AI-native development
              practices.&rdquo;
            </Typography>
            <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                'Software Architecture',
                'Engineering Leadership',
                'Performance Engineering',
                'AI-Native Development',
                'Cloud & DevOps',
                'Enterprise Systems',
              ].map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    px: '13px',
                    py: '5px',
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
                    {tag}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
