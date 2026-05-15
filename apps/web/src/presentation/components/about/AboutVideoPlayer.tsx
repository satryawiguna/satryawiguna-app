import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export function AboutVideoPlayer() {
  return (
    <Box
      sx={{
        backgroundColor: '#222a3d',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        padding: '1px',
        boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Inner gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          background: 'linear-gradient(29.3deg, rgb(45, 52, 73) 0%, rgb(19, 27, 46) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Thumbnail image with grayscale */}
      <Box sx={{ position: 'relative', width: '100%', height: { xs: '220px', md: '370px' } }}>
        <Image
          src="/assets/about/video-thumbnail.png"
          alt="About video thumbnail"
          fill
          style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
          sizes="(max-width: 768px) 100vw, 58vw"
        />
        {/* White saturation overlay for grayscale effect */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'white',
            mixBlendMode: 'saturation',
          }}
        />
      </Box>

      {/* Play button — centered */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '12px',
            border: '1px solid rgba(0,240,255,0.4)',
            backgroundColor: 'rgba(0,240,255,0.2)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1px',
          }}
        >
          <Box sx={{ width: '16.5px', height: '21px', position: 'relative', flexShrink: 0 }}>
            <Image
              src="/assets/about/icon-play.svg"
              alt="Play"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Duration badge — bottom-left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(2,6,23,0.6)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            px: '17px',
            py: '9px',
          }}
        >
          <Box sx={{ width: '12px', height: '14px', position: 'relative', flexShrink: 0 }}>
            <Image
              src="/assets/about/icon-timer.svg"
              alt="Duration"
              fill
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Nimbus Mono PS", "Courier New", monospace',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#dae2fd',
              whiteSpace: 'nowrap',
            }}
          >
            02:45
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
