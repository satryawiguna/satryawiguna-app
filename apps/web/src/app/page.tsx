import type { Metadata } from 'next';
import { PageShell, ClientBox } from '@/presentation/components/common';
import { HeroBanner, TechnicalPhilosophy, KeyExpertise } from '@/presentation/components/home';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://satryawiguna.me';
const ogImage = `${siteUrl}/assets/images/social/profile.jpeg`;

export const metadata: Metadata = {
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
    url: siteUrl,
    siteName: 'Satrya Wiguna',
    images: [
      {
        url: ogImage,
        width: 800,
        height: 800,
        alt: 'Satrya Wiguna - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@satryawiguna',
    title: 'Satrya Wiguna - Full Stack Developer',
    description: 'Building Digital Excellence Through Full Stack Mastery',
    images: [ogImage],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Satrya Wiguna - Full Stack Developer & Software Engineer',
    url: siteUrl,
    datePublished: '2025-01-01',
    dateModified: '2026-07-21',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell
        noContainer
        boxSx={{
          backgroundColor: '#0b1326',
          background: `
          radial-gradient(circle at top left, rgba(0, 219, 233, 0.05) 0%, transparent 50%),
          radial-gradient(circle at bottom right, rgba(116, 47, 229, 0.05) 0%, transparent 50%),
          linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)
        `,
        }}
      >
        <ClientBox component="main">
          <HeroBanner />
          <KeyExpertise />
          {/* <FeaturedProjects /> */}
          <TechnicalPhilosophy />
        </ClientBox>
      </PageShell>
    </>
  );
}
