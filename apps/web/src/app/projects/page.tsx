import type { Metadata } from 'next';
import { PageShell } from '@/presentation/components/common';
import { ProjectsPageClient } from '@/presentation/components/projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects | Satrya Wiguna',
  description:
    'A curated collection of full-stack engineering projects focusing on high-performance architecture, cloud scalability, and refined user experience.',
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects | Satrya Wiguna',
    description:
      'A curated collection of full-stack engineering projects focusing on high-performance architecture, cloud scalability, and refined user experience.',
    url: 'https://satryawiguna.me/projects',
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
        boxSx={{ background: 'linear-gradient(90deg, rgb(6, 14, 32) 0%, rgb(6, 14, 32) 100%)' }}
        containerSx={{
          px: { xs: '16px', md: '32px' },
          pt: '128px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <ProjectsPageClient />
      </PageShell>
    </>
  );
}
