'use client';

import { useState, useRef, Fragment } from 'react';
import { Box, Typography, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

const FALLBACK_VIDEO_URL =
  'https://satryawiguna-bucket.sgp1.digitaloceanspaces.com/dev/a58df98d-c43f-42d0-98df-5f27f1435708.mp4';

interface AboutVideoPlayerProps {
  videoUrl?: string;
}

export function AboutVideoPlayer({ videoUrl }: AboutVideoPlayerProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resolvedUrl = videoUrl || FALLBACK_VIDEO_URL;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    videoRef.current?.pause();
  };

  return (
    <Fragment>
      <Box
        onClick={handleOpen}
        sx={{
          backgroundColor: '#222a3d',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '1px',
          boxShadow: '0px 25px 50px -12px rgba(0,0,0,0.25)',
          position: 'relative',
          width: '100%',
          cursor: 'pointer',
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
            src="/assets/images/about-thumbnail.png"
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

      {/* Video Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { bgcolor: 'transparent', boxShadow: 'none', overflow: 'hidden' },
        }}
        BackdropProps={{
          sx: { bgcolor: 'rgba(0,0,0,0.85)' },
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          <video
            ref={videoRef}
            src={resolvedUrl}
            controls
            autoPlay
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: '#fff',
            bgcolor: 'rgba(0,0,0,0.6)',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    </Fragment>
  );
}
