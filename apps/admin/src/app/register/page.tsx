'use client';

import { Container, Box } from '@mui/material';
import { RegisterForm } from '@/presentation/components/forms';

export default function RegisterPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <RegisterForm />
      </Box>
    </Container>
  );
}
