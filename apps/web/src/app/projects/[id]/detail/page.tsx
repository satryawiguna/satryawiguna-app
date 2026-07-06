import { ProjectDetailClient } from '@/presentation/components/projects/detail/ProjectDetailClient';
import type { Metadata } from 'next';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Project ${id} | Satrya Wiguna`,
    description: 'View project details',
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;

  return <ProjectDetailClient id={Number(id)} />;
}
