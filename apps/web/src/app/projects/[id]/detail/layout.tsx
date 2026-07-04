import type { Metadata } from 'next';
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

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
