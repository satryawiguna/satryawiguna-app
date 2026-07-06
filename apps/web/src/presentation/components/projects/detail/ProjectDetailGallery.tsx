'use client';

import { Box, Typography } from '@mui/material';
import type { ProjectImage } from '@/domain/entities';

interface ProjectDetailGalleryProps {
  images: ProjectImage[];
}

export function ProjectDetailGallery({ images }: ProjectDetailGalleryProps) {
  if (!images || images.length === 0) return null;

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
        Gallery
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: images.length > 1 ? 'repeat(2, 1fr)' : '1fr',
          },
          gap: '16px',
        }}
      >
        {images.map((img) => (
          <Box
            key={img.id}
            sx={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              aspectRatio: '16 / 9',
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={img.image_url}
              alt="Project screenshot"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
