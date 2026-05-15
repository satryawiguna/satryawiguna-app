'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00dbe9',
      light: '#22d3ee',
      dark: '#00cad9',
    },
    secondary: {
      main: '#742fe5',
      light: '#b47fed',
      dark: '#5a23b8',
    },
    background: {
      default: '#0b1326',
      paper: 'rgba(15, 23, 42, 0.6)',
    },
    text: {
      primary: '#dbfcff',
      secondary: '#b9cacb',
    },
  },
  typography: {
    fontFamily:
      'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
