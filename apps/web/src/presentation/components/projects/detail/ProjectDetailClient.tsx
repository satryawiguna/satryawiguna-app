'use client';

import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import { PageShell, ClientContainer } from '@/presentation/components/common';
import { useProjectDetail } from '@/presentation/hooks/useProjects';
import { ProjectDetailHero } from './ProjectDetailHero';
import { ProjectDetailContent } from './ProjectDetailContent';
import { ProjectDetailSkills } from './ProjectDetailSkills';
import { ProjectDetailGallery } from './ProjectDetailGallery';

interface ProjectDetailClientProps {
  id: number;
}

export function ProjectDetailClient({ id }: ProjectDetailClientProps) {
  const { data: project, isLoading, error } = useProjectDetail(id);

  // Redirect to 404 if project not found
  if (error) {
    notFound();
  }

  if (isLoading || !project) {
    return (
      <PageShell
        noContainer
        boxSx={{ background: 'linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)' }}
      >
        <ClientContainer
          maxWidth="xl"
          sx={{
            px: { xs: '16px', md: '32px' },
            pt: '128px',
            pb: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#b9cacb',
            }}
          >
            Loading project...
          </Typography>
        </ClientContainer>
      </PageShell>
    );
  }

  return (
    <PageShell
      noContainer
      boxSx={{ background: 'linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)' }}
    >
      <ClientContainer
        maxWidth="xl"
        sx={{
          px: { xs: '16px', md: '32px' },
          pt: '96px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <ProjectDetailHero project={project} />
        <ProjectDetailContent content={project.content} />
        <ProjectDetailSkills skills={project.skills} />
        <ProjectDetailGallery images={project.images} />
      </ClientContainer>
    </PageShell>
  );
}
