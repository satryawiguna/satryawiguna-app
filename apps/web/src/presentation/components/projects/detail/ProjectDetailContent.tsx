'use client';

import { Box, Typography } from '@mui/material';

interface ProjectDetailContentProps {
  content: string;
}

export function ProjectDetailContent({ content }: ProjectDetailContentProps) {
  if (!content) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          color: '#dbfcff',
          mb: '16px',
        }}
      >
        Overview
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '28px',
          color: '#b9cacb',
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </Typography>
    </Box>
  );
}
