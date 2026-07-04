'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog';

interface BlogFeaturedPostProps {
  post: BlogPost;
}

export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        minHeight: { md: '607px' },
        width: '100%',
      }}
    >
      {/* Left: Image (grayscale) */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '240px', md: '100%' },
          overflow: 'hidden',
          order: { xs: -1, md: 0 },
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* White saturation overlay — desaturates the image */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'white',
            mixBlendMode: 'saturation',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Right: Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: '32px', md: '48px' },
          py: { xs: '40px', md: '163.5px' },
        }}
      >
        {/* Category + Date row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0', mb: '16px' }}>
          {post.category && (
            <Box
              sx={{
                backgroundColor: post.category.bgColor,
                borderRadius: '2px',
                px: '8px',
                py: '4px',
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Nimbus Mono PS, monospace',
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: post.category.textColor,
                  whiteSpace: 'nowrap',
                }}
              >
                {post.category.label}
              </Typography>
            </Box>
          )}
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#b9cacb',
              pl: '16px',
              whiteSpace: 'nowrap',
            }}
          >
            {post.date}
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '28px', md: '40px' },
            lineHeight: { xs: '36px', md: '48px' },
            letterSpacing: '-0.4px',
            color: '#dae2fd',
            mb: '24px',
          }}
        >
          {post.title}
        </Typography>

        {/* Excerpt */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#b9cacb',
            mb: '48px',
          }}
        >
          {post.excerpt}
        </Typography>

        {/* Read link */}
        <Link href={`/blog/${post.id}/detail`} style={{ textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography
              sx={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#00dbe9',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                '&:hover': { color: '#00f0ff' },
                transition: 'color 0.2s ease',
              }}
            >
              READ DEEP DIVE
            </Typography>
            <Typography sx={{ color: '#00dbe9', fontSize: '14px' }}>→</Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
