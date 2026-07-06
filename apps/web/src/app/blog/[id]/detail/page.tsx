import { BlogDetailClient } from '@/presentation/components/blog/detail/BlogDetailClient';
import type { Metadata } from 'next';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Blog Post ${id} | Satrya Wiguna`,
    description: 'View blog post details',
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  return <BlogDetailClient id={Number(id)} />;
}
