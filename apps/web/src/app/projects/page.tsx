import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import { Navigation, Footer } from '@/presentation/components/common';
import { ProjectsHero, ProjectsGrid, ProjectsCTA } from '@/presentation/components/projects';

export const metadata: Metadata = {
  title: 'Projects | Satrya Wiguna',
  description:
    'A curated collection of full-stack engineering projects focusing on high-performance architecture, cloud scalability, and refined user experience.',
};

export default function ProjectsPage() {
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
          gap: '48px',
        }}
      >
        {/* Header section */}
        <ProjectsHero />

        {/* Projects grid */}
        <ProjectsGrid />

        {/* CTA section */}
        <ProjectsCTA />
      </Container>

      <Footer />
    </Box>
  );
}
