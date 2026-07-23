'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import TerminalIcon from '@mui/icons-material/Terminal';
import DataObjectIcon from '@mui/icons-material/DataObject';
import type { BlogPost } from '@/domain/entities';

const cardBase = {
  backgroundColor: 'rgba(15, 23, 42, 0.4)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
} as const;

// Card 1 — wide text card with tag avatars
function CardText({ post }: { post: BlogPost }) {
  return (
    <Box
      sx={{
        ...cardBase,
        gridColumn: { xs: '1', md: '1 / span 8' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: '25px',
      }}
    >
      {/* Category + date */}
      {post.categories.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '16px' }}>
          <Box
            sx={{
              backgroundColor: post.categories[0].bgColor,
              borderRadius: '2px',
              px: '8px',
              py: '4px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Nimbus Mono PS, monospace',
                fontSize: '12px',
                lineHeight: '16px',
                color: post.categories[0].textColor,
                whiteSpace: 'nowrap',
              }}
            >
              {post.categories[0].label}
            </Typography>
          </Box>
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
      )}

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '36.4px',
          color: '#dae2fd',
          mb: '16px',
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
          flex: 1,
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Footer: avatars + read link */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Stacked tag avatars */}
        {post.tags && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {post.tags.map((tag, i) => (
              <Box
                key={tag.name}
                sx={{
                  backgroundColor: '#222a3d',
                  border: '2px solid #0b1326',
                  borderRadius: '12px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ml: i > 0 ? '-8px' : 0,
                  zIndex: post.tags!.length - i,
                  position: 'relative',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '10px',
                    lineHeight: '15px',
                    color: '#dae2fd',
                  }}
                >
                  {tag.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <Link href={`/blog/${post.id}/detail`} style={{ textDecoration: 'none' }}>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4edea3',
              whiteSpace: 'nowrap',
              '&:hover': { color: '#6fffc4' },
              transition: 'color 0.2s ease',
            }}
          >
            Read More
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

// Card 2 — highlight card (green-tinted, Terminal Workflow)
function CardHighlight({ post }: { post: BlogPost }) {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(78, 222, 163, 0.05)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(78, 222, 163, 0.2)',
        borderRadius: '8px',
        gridColumn: { xs: '1', md: '9 / span 4' },
        display: 'flex',
        flexDirection: 'column',
        p: '25px',
        gap: '0',
      }}
    >
      {/* Terminal icon */}
      <Box sx={{ mb: '24px' }}>
        <TerminalIcon sx={{ color: '#4edea3', fontSize: '20px' }} />
      </Box>

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '36.4px',
          color: '#dae2fd',
          mb: '16px',
        }}
      >
        {post.title}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#b9cacb',
          mb: '24px',
          flex: 1,
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Explore link */}
      <Link href={`/blog/${post.id}/detail`} style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#4edea3',
              whiteSpace: 'nowrap',
              '&:hover': { color: '#6fffc4' },
              transition: 'color 0.2s ease',
            }}
          >
            EXPLORE
          </Typography>
          <Typography sx={{ color: '#4edea3', fontSize: '13px' }}>→</Typography>
        </Box>
      </Link>
    </Box>
  );
}

// Card 3 — image + small post
function CardImage({ post }: { post: BlogPost }) {
  return (
    <Box
      sx={{
        ...cardBase,
        gridColumn: { xs: '1', md: '1 / span 4' },
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pb: '23px',
        pt: '25px',
        px: '25px',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      {post.image && (
        <Box
          sx={{
            borderRadius: '4px',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={post.thumbnail_url ?? ''}
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
        </Box>
      )}

      {/* Date */}
      <Typography
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#b9cacb',
          pt: '16px',
        }}
      >
        {post.date}
      </Typography>

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.35px',
          color: '#dae2fd',
          textTransform: 'uppercase',
        }}
      >
        {post.title}
      </Typography>

      {/* Excerpt */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#b9cacb',
          pt: '8px',
          pb: '17px',
        }}
      >
        {post.excerpt}
      </Typography>

      {/* VIEW LOG link */}
      <Link href={`/blog/${post.id}/detail`} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            borderBottom: '1px solid #00dbe9',
            display: 'inline-block',
            pb: '2px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              letterSpacing: '1px',
              color: '#00dbe9',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            VIEW LOG
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}

// Card 4 — code snippet card
function CardCode({ post }: { post: BlogPost }) {
  return (
    <Box
      sx={{
        ...cardBase,
        gridColumn: { xs: '1', md: '5 / span 4' },
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pt: '25px',
        px: '25px',
        pb: '25px',
      }}
    >
      {/* Date */}
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

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '-0.35px',
          color: '#dae2fd',
          textTransform: 'uppercase',
        }}
      >
        {post.title}
      </Typography>

      {/* Excerpt */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#b9cacb',
          pt: '8px',
          pb: '16px',
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Code block */}
      <Box
        sx={{
          backgroundColor: '#060e20',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '2px',
          p: '17px',
        }}
      >
        <Typography
          component="pre"
          sx={{
            fontFamily: 'Nimbus Mono PS, monospace',
            fontSize: '12px',
            lineHeight: '16px',
            m: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          <Box component="span" sx={{ color: '#4edea3' }}>
            pipeline
          </Box>
          <Box component="span" sx={{ color: '#b9cacb' }}>
            {' {'}
          </Box>
          {'\n'}
          <Box component="span" sx={{ color: '#b9cacb' }}>
            {"  stage('"}
          </Box>
          <Box component="span" sx={{ color: '#dbfcff' }}>
            AI-Audit
          </Box>
          <Box component="span" sx={{ color: '#b9cacb' }}>
            {"')"}
          </Box>
          {'\n'}
          <Box component="span" sx={{ color: '#b9cacb' }}>
            {'}'}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

// Card 5 — icon center card (THE STATE OF WEBGPU)
function CardIcon({ post }: { post: BlogPost }) {
  return (
    <Box
      sx={{
        ...cardBase,
        gridColumn: { xs: '1', md: '9 / span 4' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: '25px',
        minHeight: '200px',
      }}
    >
      {/* Top: date + title */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        <Typography
          component="h3"
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '-0.35px',
            color: '#dae2fd',
            textTransform: 'uppercase',
          }}
        >
          {post.title}
        </Typography>
      </Box>

      {/* Center: icon */}
      <Box sx={{ display: 'flex', justifyContent: 'center', py: '24px', opacity: 0.5 }}>
        <DataObjectIcon sx={{ color: '#dae2fd', fontSize: '40px' }} />
      </Box>

      {/* Bottom: link */}
      <Link
        href={`/blog/${post.id}/detail`}
        style={{ textDecoration: 'none', alignSelf: 'flex-end' }}
      >
        <Typography
          sx={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 400,
            fontSize: '10px',
            lineHeight: '15px',
            letterSpacing: '1px',
            color: '#00dbe9',
            textTransform: 'uppercase',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            '&:hover': { color: '#00f0ff' },
            transition: 'color 0.2s ease',
          }}
        >
          ACCESS DOCUMENTATION
        </Typography>
      </Link>
    </Box>
  );
}

interface BlogBentoGridProps {
  posts: BlogPost[];
}

export function BlogBentoGrid({ posts }: BlogBentoGridProps) {
  const [card1, card2, card3, card4, card5] = posts;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gap: '24px',
        width: '100%',
      }}
    >
      {card1 && <CardText post={card1} />}
      {card2 && <CardHighlight post={card2} />}
      {card3 && <CardImage post={card3} />}
      {card4 && <CardCode post={card4} />}
      {card5 && <CardIcon post={card5} />}
    </Box>
  );
}
