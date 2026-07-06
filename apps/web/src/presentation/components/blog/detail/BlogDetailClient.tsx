'use client';

import { notFound } from 'next/navigation';
import { Typography } from '@mui/material';
import { PageShell, ClientContainer } from '@/presentation/components/common';
import { useBlogPost } from '@/presentation/hooks/useBlog';
import { BlogDetailHero } from './BlogDetailHero';
import { BlogDetailContent } from './BlogDetailContent';
import { BlogDetailRelated } from './BlogDetailRelated';
import { BlogNewsletter } from '@/presentation/components/blog/BlogNewsletter';

interface BlogDetailClientProps {
  id: number;
}

export function BlogDetailClient({ id }: BlogDetailClientProps) {
  const { data: post, isLoading, error } = useBlogPost(id);

  if (error) {
    notFound();
  }

  if (isLoading || !post) {
    return (
      <PageShell
        noContainer
        boxSx={{ backgroundColor: 'rgb(11, 19, 38)', display: 'flex', flexDirection: 'column' }}
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
            Loading post...
          </Typography>
        </ClientContainer>
      </PageShell>
    );
  }

  // Related posts: other posts with similar categories (limited to 3)
  const relatedPosts: (typeof post)[] = [];

  return (
    <PageShell
      noContainer
      boxSx={{ backgroundColor: 'rgb(11, 19, 38)', display: 'flex', flexDirection: 'column' }}
    >
      <ClientContainer
        maxWidth="xl"
        sx={{
          flex: 1,
          pt: '96px',
          pb: '80px',
          px: { xs: '16px', md: '32px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <BlogDetailHero post={post} />

        {post.content && <BlogDetailContent content={post.content} />}

        <BlogDetailRelated posts={relatedPosts} />

        <BlogNewsletter />
      </ClientContainer>
    </PageShell>
  );
}
