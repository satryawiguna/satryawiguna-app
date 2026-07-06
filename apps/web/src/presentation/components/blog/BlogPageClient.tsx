'use client';

import { useState, useCallback, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useBlogPosts } from '@/presentation/hooks/useBlog';
import { BlogHero } from './BlogHero';
import { BlogSearch } from './BlogSearch';
import { BlogFeaturedPost } from './BlogFeaturedPost';
import { BlogBentoGrid } from './BlogBentoGrid';
import { BlogPagination } from './BlogPagination';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogSkeletonLoader } from './BlogSkeletonLoader';

export function BlogPageClient() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const limit = 6;

  // Debounce keyword search
  const debounceTimer = useMemo(() => {
    let timer: ReturnType<typeof setTimeout>;
    return (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDebouncedKeyword(value);
        setPage(1);
      }, 300);
    };
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setKeyword(value);
      debounceTimer(value);
    },
    [debounceTimer],
  );

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedKeyword ? { keyword: debouncedKeyword } : {}),
    }),
    [page, limit, debouncedKeyword],
  );

  const { data, isLoading, error } = useBlogPosts(queryParams);

  const posts = data?.data ?? [];
  const pagination = data?.pagination ?? null;
  const hasPosts = posts.length > 0;
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        width: '100%',
      }}
    >
      <BlogHero />
      <BlogSearch value={keyword} onSearch={handleSearch} />

      {isLoading ? (
        <Box sx={{ pt: '48px' }}>
          <BlogSkeletonLoader />
        </Box>
      ) : error || !hasPosts ? (
        <Box
          sx={{
            pt: '80px',
            pb: '80px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              color: '#64748b',
            }}
          >
            {error ? 'Failed to load blog posts. Please try again later.' : 'No posts found.'}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              pt: '48px',
              pb: '0',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <BlogFeaturedPost post={featuredPost} />
            {remainingPosts.length > 0 && <BlogBentoGrid posts={remainingPosts} />}
          </Box>

          {pagination && (
            <Box sx={{ mt: '48px' }}>
              <BlogPagination pagination={pagination} currentPage={page} onPageChange={setPage} />
            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: '48px', mb: '48px' }}>
        <BlogNewsletter />
      </Box>
    </Box>
  );
}
