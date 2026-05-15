import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import { Navigation, Footer } from '@/presentation/components/common';
import {
  ResumeHero,
  ResumeExperience,
  ResumeEducation,
  ResumeContactCard,
  ResumeTechStack,
  ResumeStrengths,
  ResumeCodeBlock,
} from '@/presentation/components/resume';

export const metadata: Metadata = {
  title: 'Resume | Satrya Wiguna',
  description:
    'Full Stack Developer with over 20 years of professional experience. View my work history, education, technical skills, and expertise.',
};

export default function ResumePage() {
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
          px: { xs: '16px', md: '32px' },
          pt: '128px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
        }}
      >
        {/* Header section */}
        <ResumeHero />

        {/* Main content grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, minmax(0, 1fr))' },
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Left column: Experience + Education */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '1 / span 8' },
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <ResumeExperience />
            <ResumeEducation />
          </Box>

          {/* Right column: Contact + Tech Stack + Strengths + Code Block */}
          <Box
            sx={{
              gridColumn: { xs: '1', lg: '9 / span 4' },
              display: 'flex',
              flexDirection: 'column',
              gap: '48px',
            }}
          >
            <ResumeContactCard />
            <ResumeTechStack />
            <ResumeStrengths />
            <ResumeCodeBlock />
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
