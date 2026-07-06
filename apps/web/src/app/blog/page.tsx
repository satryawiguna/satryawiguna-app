import type { Metadata } from 'next';
import { PageShell } from '@/presentation/components/common';
import { BlogPageClient } from '@/presentation/components/blog';

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
      <BlogPageClient />
    </PageShell>
  );
}
