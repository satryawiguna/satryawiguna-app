'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import type { BlogPost } from '@/domain/entities';

interface BlogDetailRelatedProps {
  posts: BlogPost[];
}

export function BlogDetailRelated({ posts }: BlogDetailRelatedProps) {
  if (posts.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
      {/* Section heading */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Box
          sx={{ width: '4px', height: '32px', backgroundColor: '#4edea3', borderRadius: '2px' }}
        />
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '40px',
            color: '#dae2fd',
          }}
        >
          More Logs
        </Typography>
      </Box>

      {/* Cards grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: `repeat(${Math.min(posts.length, 3)}, 1fr)`,
          },
          gap: '24px',
        }}
      >
        {posts.slice(0, 3).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}/detail`} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                p: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '100%',
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: 'rgba(0, 240, 255, 0.3)' },
              }}
            >
              {/* Category + date */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {post.categories.length > 0 ? (
                  <Box
                    sx={{
                      backgroundColor: post.categories[0].bgColor,
                      borderRadius: '2px',
                      px: '8px',
                      py: '2px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Nimbus Mono PS, monospace',
                        fontSize: '10px',
                        lineHeight: '14px',
                        color: post.categories[0].textColor,
                      }}
                    >
                      {post.categories[0].label}
                    </Typography>
                  </Box>
                ) : null}
                {post.date && (
                  <Typography
                    sx={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                      color: '#64748b',
                    }}
                  >
                    {post.date}
                  </Typography>
                )}
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '26px',
                  color: '#dae2fd',
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.title}
              </Typography>

              {/* Excerpt */}
              {post.excerpt && (
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#64748b',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.excerpt}
                </Typography>
              )}

              {/* Read more */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Typography
                  sx={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '20px',
                    color: '#4edea3',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Read Log
                </Typography>
                <NorthEastIcon sx={{ color: '#4edea3', fontSize: '14px' }} />
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
