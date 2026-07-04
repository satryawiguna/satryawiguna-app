'use client';

import { Box, Typography } from '@mui/material';
import type { BlogContentBlockType } from '@/data/blog';

interface BlogDetailContentProps {
  content: BlogContentBlockType[];
}

export function BlogDetailContent({ content }: BlogDetailContentProps) {
  return (
    <Box
      component="article"
      sx={{
        maxWidth: '768px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
      }}
    >
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <Typography
                key={index}
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '32px',
                  color: '#b9cacb',
                }}
              >
                {block.text}
              </Typography>
            );

          case 'heading':
            return (
              <Typography
                key={index}
                component={block.level === 2 ? 'h2' : 'h3'}
                sx={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: block.level === 2 ? '32px' : '24px',
                  lineHeight: block.level === 2 ? '40px' : '32px',
                  color: '#dae2fd',
                  mt: block.level === 2 ? '48px' : '32px',
                  mb: '-8px',
                }}
              >
                {block.text}
              </Typography>
            );

          case 'code':
            return (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  backgroundColor: '#060e20',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  p: '24px',
                  overflow: 'auto',
                }}
              >
                {block.language && (
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: '12px',
                      right: '16px',
                      fontFamily: 'Nimbus Mono PS, monospace',
                      fontSize: '11px',
                      lineHeight: '16px',
                      color: '#4edea3',
                      textTransform: 'uppercase',
                    }}
                  >
                    {block.language}
                  </Typography>
                )}
                <Box
                  component="pre"
                  sx={{
                    margin: 0,
                    fontFamily: 'Nimbus Mono PS, monospace',
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: '#dae2fd',
                    whiteSpace: 'pre',
                    overflow: 'auto',
                  }}
                >
                  {block.code}
                </Box>
              </Box>
            );

          case 'blockquote':
            return (
              <Box
                key={index}
                sx={{
                  borderLeft: '4px solid #4edea3',
                  pl: '24px',
                  py: '4px',
                  backgroundColor: 'rgba(78, 222, 163, 0.04)',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter, sans-serif',
                    fontStyle: 'italic',
                    fontSize: '18px',
                    lineHeight: '30px',
                    color: '#b9cacb',
                  }}
                >
                  {block.text}
                </Typography>
              </Box>
            );

          case 'list':
            return (
              <Box
                key={index}
                component="ul"
                sx={{
                  margin: 0,
                  paddingLeft: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  '& li::marker': { color: '#4edea3' },
                }}
              >
                {block.items.map((item, i) => (
                  <Box
                    key={i}
                    component="li"
                    sx={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: '26px',
                      color: '#b9cacb',
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            );

          default:
            return null;
        }
      })}
    </Box>
  );
}
