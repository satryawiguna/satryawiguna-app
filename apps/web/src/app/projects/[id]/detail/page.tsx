import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell, ClientBox, ClientContainer } from '@/presentation/components/common';
import {
  ProjectDetailHero,
  ProjectDetailMetrics,
  ProjectDetailChallenge,
  ProjectDetailCapabilities,
  ProjectDetailTechStack,
  ProjectDetailCTA,
} from '@/presentation/components/projects';
import { projects, getProjectById } from '@/data/projects';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: String(project.id),
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const project = getProjectById(id);

  if (!project) {
    return { title: 'Project Not Found | Satrya Wiguna' };
  }

  return {
    title: `${project.title} | Satrya Wiguna`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const project = getProjectById(id);

  if (!project) {
    notFound();
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
          gap: '0px',
        }}
      >
        <ProjectDetailHero project={project} />
        <ProjectDetailMetrics metrics={project.metrics} />
        <ProjectDetailChallenge project={project} />
        <ProjectDetailCapabilities project={project} />
      </ClientContainer>

      <ProjectDetailTechStack project={project} />

      <ClientContainer
        maxWidth="xl"
        sx={{
          px: { xs: '16px', md: '32px' },
          pt: '80px',
          pb: '80px',
        }}
      >
        <ProjectDetailCTA project={project} />
      </ClientContainer>
    </PageShell>
  );
}
