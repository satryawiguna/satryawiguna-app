'use client';

import { Formik, Form } from 'formik';
import { Box, Button, Typography, Paper, Alert, Divider } from '@mui/material';
import { FormikTextField, FormikCheckbox, registerFormSchema } from 'ui';
import { useState } from 'react';
import Link from 'next/link';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export function RegisterForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Register values:', values);
      setSubmitStatus({
        type: 'success',
        message: 'Registration successful! Please check your email to verify your account.',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create Account
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Fill in the form below to create a new account
      </Typography>

      {submitStatus && (
        <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
          {submitStatus.message}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={registerFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormikTextField
                name="name"
                label="Full Name"
                placeholder="John Doe"
                autoComplete="name"
              />

              <FormikTextField
                name="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
              />

              <FormikTextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                helperText="Must include uppercase, lowercase, and number"
              />

              <FormikTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
              />

              <FormikCheckbox
                name="acceptTerms"
                label={
                  <Typography variant="body2">
                    I accept the{' '}
                    <Link href="/terms" style={{ color: 'inherit' }}>
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || !isValid || !dirty}
                fullWidth
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: 'inherit', fontWeight: 500 }}>
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
