'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
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
        <DashboardIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          Welcome to the admin panel. Manage your application with ease.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" size="large" component={Link} href="/dashboard">
            Go to Dashboard
          </Button>
          <Button variant="outlined" size="large" component={Link} href="/settings">
            Settings
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
