'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from 'shared-store';
import { selectIsAuthenticated } from 'shared-store';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Guards a route so that only authenticated users can access it.
 * Redirects to /login if the user is not authenticated.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-6 h-6 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
