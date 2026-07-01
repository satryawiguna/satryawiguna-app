'use client';

import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface PageShellProps {
  children: ReactNode;
  containerSx?: SxProps<Theme>;
  boxSx?: SxProps<Theme>;
  /** When true, renders children directly without a Container wrapper */
  noContainer?: boolean;
}

export function PageShell({ children, containerSx, boxSx, noContainer }: PageShellProps) {
  const content = noContainer ? (
    children
  ) : (
    <Container maxWidth="xl" sx={containerSx}>
      {children}
    </Container>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...boxSx,
      }}
    >
      <Navigation />
      {content}
      <Footer />
    </Box>
  );
}
    </Box>
  );
}
