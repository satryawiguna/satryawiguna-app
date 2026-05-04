'use client';

import { Formik, Form } from 'formik';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { FormikTextField, FormikCheckbox, loginFormSchema } from 'ui';
import { useState } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

export function LoginForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Login values:', values);
      setSubmitStatus({
        type: 'success',
        message: 'Login successful! (Demo)',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Login failed. Please try again.',
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Admin Login
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Sign in to access the admin dashboard
      </Typography>

      {submitStatus && (
        <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
          {submitStatus.message}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormikTextField
                name="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
              />

              <FormikTextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
              />

              <FormikCheckbox name="rememberMe" label="Remember me" />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting || !isValid || !dirty}
                fullWidth
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Button size="small" color="inherit">
                  Forgot password?
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
