import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageShell, ClientBox } from '@/presentation/components/common';
import {
  BlogDetailHero,
  BlogDetailContent,
  BlogDetailRelated,
} from '@/presentation/components/blog/detail';
import { BlogNewsletter } from '@/presentation/components/blog';
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

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(Number(id));

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <PageShell
      boxSx={{ backgroundColor: 'rgb(11, 19, 38)', display: 'flex', flexDirection: 'column' }}
      containerSx={{
        flex: 1,
        pt: '128px',
        pb: '96px',
        px: { xs: '16px', md: '32px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
      }}
    >
      <BlogDetailHero post={post} />

      <ClientBox
        sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      />

      {post.content && post.content.length > 0 && <BlogDetailContent content={post.content} />}

      <ClientBox
        sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      />

      <BlogDetailRelated posts={relatedPosts} />

      <BlogNewsletter />
    </PageShell>
  );
}
