'use client';

import { Formik, Form } from 'formik';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { FormikTextField, contactFormSchema } from 'ui';
import { useState } from 'react';

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Contact form values:', values);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
      });
      resetForm();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Have a question or want to work together? Fill out the form below and I'll get back to you
        as soon as possible.
      </Typography>

      {submitStatus && (
        <Alert severity={submitStatus.type} sx={{ mb: 3 }} onClose={() => setSubmitStatus(null)}>
          {submitStatus.message}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormikTextField
                name="name"
                label="Your Name"
                placeholder="John Doe"
                autoComplete="name"
              />

              <FormikTextField
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
              />

              <FormikTextField name="subject" label="Subject" placeholder="What is this about?" />

              <FormikTextField
                name="message"
                label="Message"
                placeholder="Your message here..."
                multiline
                rows={6}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || !isValid || !dirty}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
