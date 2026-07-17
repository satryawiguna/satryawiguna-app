'use client';

import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface BlogDetailContentProps {
  content: string;
}

/**
 * Renders blog post content as styled markdown.
 * The API returns content as a Markdown string; we render it safely
 * with the same visual styles as the previous block-based renderer.
 */
export function BlogDetailContent({ content }: BlogDetailContentProps) {
  if (!content) return null;

  return (
    <Box
      component="article"
      sx={{
        maxWidth: '768px',
        mx: 'auto',
        width: '100%',
        '& h1': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '40px',
          lineHeight: '48px',
          color: '#dae2fd',
          mt: '48px',
          mb: '16px',
        },
        '& h2': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '32px',
          lineHeight: '40px',
          color: '#dae2fd',
          mt: '48px',
          mb: '16px',
        },
        '& h3': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#dae2fd',
          mt: '32px',
          mb: '16px',
        },
        '& p': {
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '32px',
          color: '#b9cacb',
          mb: '24px',
        },
        '& strong': {
          color: '#dae2fd',
        },
        '& a': {
          color: '#22d3ee',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '& pre': {
          position: 'relative',
          backgroundColor: '#060e20',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          p: '24px',
          overflow: 'auto',
          fontFamily: 'Nimbus Mono PS, monospace',
          fontSize: '14px',
          lineHeight: '22px',
          color: '#dae2fd',
          whiteSpace: 'pre',
          mb: '24px',
        },
        '& code': {
          fontFamily: 'Nimbus Mono PS, monospace',
          fontSize: '14px',
          lineHeight: '22px',
          color: '#dae2fd',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          px: '6px',
          py: '2px',
          borderRadius: '4px',
        },
        '& pre code': {
          backgroundColor: 'transparent',
          px: 0,
          py: 0,
        },
        '& blockquote': {
          borderLeft: '4px solid #4edea3',
          pl: '24px',
          py: '4px',
          backgroundColor: 'rgba(78, 222, 163, 0.04)',
          borderRadius: '0 4px 4px 0',
          mb: '24px',
          '& p': {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'italic',
            fontSize: '18px',
            lineHeight: '30px',
            color: '#b9cacb',
            mb: 0,
          },
        },
        '& ul, & ol': {
          margin: 0,
          paddingLeft: '24px',
          mb: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          '& li::marker': { color: '#4edea3' },
          '& li': {
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            lineHeight: '26px',
            color: '#b9cacb',
          },
        },
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          mb: '24px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          lineHeight: '22px',
        },
        '& th': {
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          color: '#dae2fd',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          textAlign: 'left',
          px: '12px',
          py: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '& td': {
          color: '#b9cacb',
          px: '12px',
          py: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
        '& tr:last-child td': {
          borderBottom: 'none',
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
}
