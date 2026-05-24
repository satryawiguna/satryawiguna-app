'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/presentation/components/auth';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
