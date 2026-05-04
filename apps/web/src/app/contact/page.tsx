'use client';

import { Container, Box } from '@mui/material';
import { ContactForm } from '@/presentation/components/forms';

export default function ContactPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <ContactForm />
      </Box>
    </Container>
  );
}
