'use client';

import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import ElectricBorder from './ElectricBorder';

const cards = [
  {
    icon: '/assets/icons/icon-architecture.svg',
    iconWidth: 30,
    iconHeight: 28.75,
    title: 'System Architecture & Scalability',
    description:
      'Designing resilient, scalable software architectures capable of supporting enterprise workloads, distributed systems, and long-term product growth.',
  },
  {
    icon: '/assets/icons/icon-performance-opt.svg',
    iconWidth: 25,
    iconHeight: 20,
    title: 'Performance Optimization',
    description:
      'Optimizing applications across every layer — from database design and API performance to frontend rendering — to deliver fast, reliable user experiences at scale.',
  },
  {
    icon: '/assets/icons/icon-team-leadership.svg',
    iconWidth: 30,
    iconHeight: 15,
    title: 'Technical Team Leadership',
    description:
      'Leading cross-functional engineering teams through technical mentoring, architecture reviews, agile collaboration, and engineering best practices.',
  },
  {
    icon: '/assets/icons/icon-ai-integration.svg',
    iconWidth: 27.5,
    iconHeight: 23.75,
    title: 'AI-Native Engineering',
    description:
      'Integrating AI-native workflows, LLM-powered capabilities, and intelligent automation into modern software platforms to accelerate engineering productivity and business innovation.',
  },
];

export function KeyExpertise() {
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

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: '32px' } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, md: '48px' },
          }}
        >
          {/* Header: CAPABILITIES badge + "Key Expertise" title */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* CAPABILITIES badge */}
            <Box sx={{ mb: '16px' }}>
              <Box
                sx={{
                  display: 'inline-flex',
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
                  CAPABILITIES
                </Typography>
              </Box>
            </Box>

            {/* Title */}
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: { xs: '28px', md: '36px' },
                lineHeight: '40px',
                color: '#dbfcff',
                textAlign: 'center',
              }}
            >
              Key Expertise
            </Typography>
          </Box>

          {/* 2×2 Card Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: '24px',
            }}
          >
            {cards.map((card) => (
              <ElectricBorder
                key={card.title}
                color="#00dbe9"
                speed={0.8}
                chaos={0.15}
                borderRadius={8}
                style={{ borderRadius: 8 }}
                hoverOnly
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
                    gap: '12px',
                    height: '100%',
                  }}
                >
                  {/* Icon box */}
                  <Box
                    sx={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(0, 219, 233, 0.1)',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={card.icon}
                      alt={card.title}
                      width={card.iconWidth}
                      height={card.iconHeight}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Title */}
                  <Box sx={{ pt: '12px' }}>
                    <Typography
                      sx={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '28px',
                        color: '#dbfcff',
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: '#b9cacb',
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>
              </ElectricBorder>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
