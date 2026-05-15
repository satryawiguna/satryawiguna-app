import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import { Navigation, Footer } from '@/presentation/components/common';
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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg, rgb(11, 19, 38) 0%, rgb(11, 19, 38) 100%)',
      }}
    >
      <Navigation />

      {/* Main content */}
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: '16px', md: '32px' },
          pt: '128px',
          pb: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
      >
        {/* Hero */}
        <BlogHero />

        {/* Search */}
        <BlogSearch />

        {/* Blog grid section */}
        <Box sx={{ pt: '48px', pb: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Featured post */}
          <BlogFeaturedPost post={featuredPost} />

          {/* Bento grid */}
          <BlogBentoGrid posts={benchmarkPosts} />
        </Box>

        {/* Pagination */}
        <Box sx={{ mt: '48px' }}>
          <BlogPagination totalResults={24} totalPages={4} perPage={6} />
        </Box>

        {/* Newsletter */}
        <Box sx={{ mt: '48px', mb: '48px' }}>
          <BlogNewsletter />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
