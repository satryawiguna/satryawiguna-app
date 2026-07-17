'use client';

import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface ProjectDetailContentProps {
  content: string;
}

export function ProjectDetailContent({ content }: ProjectDetailContentProps) {
  if (!content) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        component="article"
        sx={{
          maxWidth: '768px',
          mx: 'auto',
          width: '100%',
          '& h1': {
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            color: '#dbfcff',
            mb: '8px',
          },
          '& h2': {
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            color: '#dbfcff',
            mt: '32px',
            mb: '16px',
          },
          '& h3': {
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '28px',
            color: '#dbfcff',
            mt: '24px',
            mb: '12px',
          },
          '& p': {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
            color: '#b9cacb',
            mb: '16px',
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
          '& ul, & ol': {
            margin: 0,
            paddingLeft: '24px',
            mb: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            '& li': {
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              lineHeight: '26px',
              color: '#b9cacb',
            },
            '& li::marker': { color: '#22d3ee' },
          },
          '& code': {
            fontFamily: 'Nimbus Mono PS, monospace',
            fontSize: '14px',
            lineHeight: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            px: '6px',
            py: '2px',
            borderRadius: '4px',
            color: '#dae2fd',
          },
          '& pre': {
            backgroundColor: '#060e20',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            p: '24px',
            overflow: 'auto',
            mb: '16px',
            '& code': {
              backgroundColor: 'transparent',
              px: 0,
              py: 0,
            },
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            mb: '16px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: '22px',
          },
          '& th': {
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            color: '#dbfcff',
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
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => (
              <Box
                component="img"
                src={src}
                alt={alt}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'block',
                  my: '24px',
                }}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
}
