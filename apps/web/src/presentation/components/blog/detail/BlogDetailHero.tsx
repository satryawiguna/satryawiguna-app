'use client';

import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog';

interface BlogDetailHeroProps {
  post: BlogPost;
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      {/* Back link */}
      <Link href="/blog" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: 'fit-content',
            '&:hover .back-text': { color: '#00dbe9' },
          }}
        >
          <ArrowBackIcon sx={{ color: '#00f0ff', fontSize: '16px' }} />
          <Typography
            className="back-text"
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#00f0ff',
              transition: 'color 0.2s ease',
            }}
          >
            BACK TO BLOG
          </Typography>
        </Box>
      </Link>

      {/* Meta row: category + date + reading time */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {post.category && (
          <Box
            sx={{
              backgroundColor: post.category.bgColor,
              borderRadius: '2px',
              px: '10px',
              py: '4px',
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
          }}
        >
          {post.date}
        </Typography>
        {post.readingTime && (
          <>
            <Box
              sx={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#64748b' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AccessTimeIcon sx={{ color: '#64748b', fontSize: '14px' }} />
              <Typography
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#64748b',
                }}
              >
                {post.readingTime}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Title */}
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '36px', md: '56px' },
          lineHeight: { xs: '44px', md: '64px' },
          letterSpacing: '-1px',
          color: '#dae2fd',
          maxWidth: '900px',
        }}
      >
        {post.title}
      </Typography>

      {/* Excerpt */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '30px',
          color: '#b9cacb',
          maxWidth: '720px',
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Box
              key={tag}
              sx={{
                backgroundColor: '#222a3d',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                px: '12px',
                py: '4px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Nimbus Mono PS, monospace',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#94a3b8',
                }}
              >
                {tag}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Hero image */}
      {post.image && (
        <Box
          sx={{
            width: '100%',
            height: { xs: '240px', md: '460px' },
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
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
          {/* Subtle grayscale overlay */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'white',
              mixBlendMode: 'saturation',
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />
        </Box>
      )}
    </Box>
  );
}
