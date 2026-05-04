'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <HomeIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Satryawiguna
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          Full Stack Developer | Software Engineer | Tech Enthusiast
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" size="large" component={Link} href="/about">
            About Me
          </Button>
          <Button variant="outlined" size="large" component={Link} href="/contact">
            Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
