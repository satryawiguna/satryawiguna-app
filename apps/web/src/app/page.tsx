import { Box } from '@mui/material';
import { Navigation, Footer } from '@/presentation/components/common';
import { HeroBanner, TechnicalPhilosophy, KeyExpertise } from '@/presentation/components/home';

export const metadata = {
  title: 'Satrya Wiguna - Full Stack Developer & Software Engineer',
  description:
    'Architecting high-performance web ecosystems with precision. I transform complex business logic into elegant, scalable software solutions.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Laravel',
    'AWS',
  ],
  openGraph: {
    title: 'Satrya Wiguna - Full Stack Developer',
    description: 'Building Digital Excellence Through Full Stack Mastery',
    type: 'website',
  },
};

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0b1326',
        background: `
          radial-gradient(circle at top left, rgba(0, 219, 233, 0.05) 0%, transparent 50%),
          radial-gradient(circle at bottom right, rgba(116, 47, 229, 0.05) 0%, transparent 50%),
          linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)
        `,
      }}
    >
      <Navigation />
      <Box component="main">
        <HeroBanner />
        <KeyExpertise />
        {/* <FeaturedProjects /> */}
        <TechnicalPhilosophy />
      </Box>
      <Footer />
    </Box>
  );
}
