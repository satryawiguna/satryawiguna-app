'use client';

import { Container, Box } from '@mui/material';
import { LoginForm } from '@/presentation/components/forms';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <LoginForm />
      </Box>
    </Container>
  );
}
