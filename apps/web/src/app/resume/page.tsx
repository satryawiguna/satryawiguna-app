import type { Metadata } from 'next';
import { PageShell, ClientBox } from '@/presentation/components/common';
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

async function getResumeFileUrl(): Promise<string | null> {
  const { apiClient } = await import('shared-api');
  try {
    const response = await apiClient.get<{
      success: boolean;
      data: Record<string, string>;
    }>('/settings', {
      params: { slugs: 'RESUME_FILE_URL' },
    });
    return response.data.RESUME_FILE_URL ?? null;
  } catch {
    return null;
  }
}

export default async function ResumePage() {
  const resumeFileUrl = await getResumeFileUrl();
  return (
    <PageShell
      boxSx={{ background: 'linear-gradient(90deg, rgb(6, 14, 32) 0%, rgb(6, 14, 32) 100%)' }}
      containerSx={{
        px: { xs: '16px', md: '32px' },
        pt: '128px',
        pb: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
      }}
    >
      <ResumeHero resumeFileUrl={resumeFileUrl} />

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
            gridColumn: { xs: '1', lg: '1 / span 8' },
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <ResumeExperience />
          <ResumeEducation />
        </ClientBox>

        <ClientBox
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
        </ClientBox>
      </ClientBox>
    </PageShell>
  );
}
