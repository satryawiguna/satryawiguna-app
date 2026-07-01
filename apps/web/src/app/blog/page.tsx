import type { Metadata } from 'next';
import { PageShell, ClientBox } from '@/presentation/components/common';
import {
  BlogHero,
  BlogSearch,
  BlogFeaturedPost,
  BlogBentoGrid,
  BlogPagination,
  BlogNewsletter,
} from '@/presentation/components/blog';
import { featuredPost, benchmarkPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Technical Logs | Satrya Wiguna',
  description:
    'Exploring the frontiers of full-stack engineering, distributed systems, and modern UI architectures.',
};

export default function BlogPage() {
  return (
    <PageShell
      boxSx={{ background: 'linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)' }}
      containerSx={{
        px: { xs: '16px', md: '32px' },
        pt: '128px',
        pb: '80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      <BlogHero />
      <BlogSearch />

      <ClientBox
        sx={{ pt: '48px', pb: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <BlogFeaturedPost post={featuredPost} />
        <BlogBentoGrid posts={benchmarkPosts} />
      </ClientBox>

      <ClientBox sx={{ mt: '48px' }}>
        <BlogPagination totalResults={24} totalPages={4} perPage={6} />
      </ClientBox>

      <ClientBox sx={{ mt: '48px', mb: '48px' }}>
        <BlogNewsletter />
      </ClientBox>
    </PageShell>
  );
}
