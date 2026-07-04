import type { Metadata } from 'next';
import { allPosts, getPostById } from '@/data/blog';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(Number(id));

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Satrya Wiguna`,
    description: post.excerpt,
  };
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
