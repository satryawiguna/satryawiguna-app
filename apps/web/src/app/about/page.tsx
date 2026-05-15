import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import { Navigation, Footer } from '@/presentation/components/common';
import {
  AboutHero,
  AboutVideoPlayer,
  AboutTechPhilosophy,
  AboutBioCard,
  AboutStatsAndSocials,
  AboutCareerImpact,
  AboutTechStack,
} from '@/presentation/components/about';

export const metadata: Metadata = {
  title: 'About | Satrya Wiguna',
  description:
    'Senior Full Stack Architect with 20+ years of experience. Discover the journey, technical philosophy, and career impact of Satrya Wiguna — based in Bali, architecting scalable solutions for the global network.',
};

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg, rgb(6, 14, 32) 0%, rgb(6, 14, 32) 100%)',
      }}
    >
      <Navigation />

      {/* Main content */}
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: '16px', md: '24px' },
          pt: '128px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        {/* About Header */}
        <AboutHero />

        {/* Bento layout: Video+Philosophy (7 cols) + Bio+Stats+Socials (5 cols) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, minmax(0, 1fr))' },
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Left column — Video player + Technical Philosophy */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '1 / span 7' },
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <AboutVideoPlayer />
            <AboutTechPhilosophy />
          </Box>

          {/* Right column — Bio card + Stats + Socials */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '8 / span 5' },
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <AboutBioCard />
            <AboutStatsAndSocials />
          </Box>
        </Box>

        {/* Career Impact & Trajectory */}
        <AboutCareerImpact />

        {/* Tech Stack horizontal strip */}
        <AboutTechStack />
      </Container>

      <Footer />
    </Box>
  );
}
