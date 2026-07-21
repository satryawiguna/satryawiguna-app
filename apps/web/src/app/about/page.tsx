import type { Metadata } from 'next';
import { PageShell, ClientBox } from '@/presentation/components/common';
import {
  AboutHero,
  AboutVideoPlayer,
  AboutTechPhilosophy,
  AboutBioCard,
  AboutStatsAndSocials,
  AboutCareerImpact,
  AboutTechStack,
} from '@/presentation/components/about';
import { apiClient } from 'shared-api';

export const metadata: Metadata = {
  title: 'About | Satrya Wiguna',
  description:
    'Senior Full Stack Architect with 20+ years of experience. Discover the journey of Satrya Wiguna — based in Bali, architecting scalable global solutions.',
};

interface SettingsResponse {
  success: boolean;
  status: number;
  message: string;
  data: Record<string, string>;
  timestamp: string;
}

async function getSocialSettings(): Promise<Record<string, string>> {
  try {
    const response = await apiClient.get<SettingsResponse>('/settings', {
      params: { slugs: 'GITHUB_URL,LINKED_IN_URL,PROFILE_VIDEO_URL' },
    });
    return response.data ?? {};
  } catch {
    return {};
  }
}

export default async function AboutPage() {
  const settings = await getSocialSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About | Satrya Wiguna',
    description:
      'Senior Full Stack Architect with 20+ years of experience. Discover the journey of Satrya Wiguna — based in Bali, architecting scalable global solutions.',
    url: 'https://satryawiguna.me/about',
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
          px: { xs: '16px', md: '24px' },
          pt: '128px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <AboutHero />

        {/* Bento layout: Video+Philosophy (7 cols) + Bio+Stats+Socials (5 cols) */}
        <ClientBox
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, minmax(0, 1fr))' },
            gap: '24px',
            alignItems: 'start',
          }}
        >
          <ClientBox
            sx={{
              gridColumn: { xs: '1', lg: '1 / span 7' },
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <AboutVideoPlayer videoUrl={settings.PROFILE_VIDEO_URL} />
            <AboutTechPhilosophy />
          </ClientBox>

          <ClientBox
            sx={{
              gridColumn: { xs: '1', lg: '8 / span 5' },
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <AboutBioCard />
            <AboutStatsAndSocials
              githubUrl={settings.GITHUB_URL}
              linkedinUrl={settings.LINKED_IN_URL}
            />
          </ClientBox>
        </ClientBox>

        <AboutCareerImpact />
        <AboutTechStack />
      </PageShell>
    </>
  );
}
