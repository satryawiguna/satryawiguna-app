'use client';

import { useState } from 'react';
import { Box, InputBase, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function BlogSearch() {
  const [value, setValue] = useState('');

  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '672px',
        width: '100%',
        mx: 'auto',
        mt: '24px',
      }}
    >
      {/* Search icon */}
      <Box
        sx={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <SearchIcon sx={{ color: 'rgba(185,202,203,0.5)', fontSize: '18px' }} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          backgroundColor: '#131b2e',
          border: '1px solid #3b494b',
          borderRadius: '12px',
          px: '49px',
          py: '19px',
          boxShadow:
            '0 10px 15px -3px rgba(22,78,99,0.05), 0 4px 6px -4px rgba(22,78,99,0.05)',
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search technical logs..."
          fullWidth
          sx={{
            fontFamily: 'Nimbus Mono PS, monospace',
            fontSize: '16px',
            color: 'rgba(185,202,203,0.8)',
            '& .MuiInputBase-input': {
              p: 0,
              fontFamily: 'Nimbus Mono PS, monospace',
              fontSize: '16px',
              color: 'rgba(185,202,203,0.8)',
              caretColor: '#00f0ff',
              '&::placeholder': {
                color: 'rgba(185,202,203,0.5)',
                opacity: 1,
              },
            },
          }}
        />
      </Box>

      {/* CMD+K badge */}
      <Box
        sx={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#222a3d',
            border: '1px solid #3b494b',
            borderRadius: '2px',
            px: '9px',
            py: '1px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Nimbus Mono PS, monospace',
              fontSize: '10px',
              lineHeight: '15px',
              color: '#b9cacb',
              whiteSpace: 'nowrap',
            }}
          >
            CMD + K
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
