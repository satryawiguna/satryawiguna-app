'use client';

import { useState } from 'react';
import { Box, InputBase, Typography } from '@mui/material';

export function BlogNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // TODO: connect to newsletter API
    setEmail('');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(219, 252, 255, 0.2)',
        borderRadius: '16px',
        px: { xs: '24px', md: '49px' },
        py: { xs: '48px', md: '64px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Top-right glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '256px',
          height: '256px',
          background: 'radial-gradient(circle at top right, rgba(219,252,255,0.1) 0%, transparent 70%)',
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: { xs: '28px', md: '40px' },
          lineHeight: { xs: '36px', md: '48px' },
          color: '#dae2fd',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Stay Synchronized
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '24px',
          color: '#b9cacb',
          textAlign: 'center',
          maxWidth: '576px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Get notified when new technical logs are published. No spam, only signal.
      </Typography>

      {/* Email form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '12px', sm: '0' },
          width: '100%',
          maxWidth: '560px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Email input */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#0f172a',
            border: '1px solid #3b494b',
            borderRadius: { xs: '4px', sm: '4px 0 0 4px' },
            px: '16px',
            py: '12px',
          }}
        >
          <InputBase
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dev@example.com"
            fullWidth
            type="email"
            sx={{
              '& .MuiInputBase-input': {
                p: 0,
                fontFamily: 'Nimbus Mono PS, monospace',
                fontSize: '14px',
                color: '#dae2fd',
                caretColor: '#00f0ff',
                '&::placeholder': {
                  color: '#6b7280',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        {/* Subscribe button */}
        <Box
          component="button"
          onClick={handleSubscribe}
          sx={{
            backgroundColor: '#4edea3',
            border: 'none',
            borderRadius: { xs: '4px', sm: '0 4px 4px 0' },
            px: '48px',
            py: '12px',
            cursor: 'pointer',
            flexShrink: 0,
            '&:hover': { backgroundColor: '#6fffc4' },
            transition: 'background-color 0.2s ease',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#002113',
              whiteSpace: 'nowrap',
            }}
          >
            Subscribe
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
