'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch } from 'shared-store';
import { loginSuccess } from 'shared-store';
import { AUTH_DATA_DEFAULTS, AuthData } from 'shared-types';

/**
 * Runs once on mount. Reads `auth-data` from localStorage and:
 * 1. Restores Redux auth state so the rest of the app is in sync.
 * 2. If the user is already authenticated but landed on a public page
 *    (e.g. /login), redirects to /dashboard.
 */
export function AuthInitializer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let authData: AuthData = AUTH_DATA_DEFAULTS;

    try {
      const raw = localStorage.getItem('auth-data');
      if (raw) {
        authData = JSON.parse(raw) as AuthData;
      }
    } catch {
      // Corrupted data — leave as defaults
    }

    if (!authData.isLogin || !authData.accessToken) return;

    // Restore the middleware cookie in case it was lost (e.g. browser cleared cookies
    // but localStorage is still intact — unlikely, but keeps both in sync).
    if (!document.cookie.split(';').some((c) => c.trim().startsWith('auth-token='))) {
      document.cookie = `auth-token=${authData.accessToken}; path=/; max-age=604800; SameSite=Lax`;
    }

    // 1. Restore Redux state
    dispatch(
      loginSuccess({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken ?? '',
        tokenType: authData.tokenType ?? 'Bearer',
        expiresIn: authData.expiresIn ?? '',
        refreshExpiresIn: authData.refreshExpiresIn ?? '',
        user: authData.user!,
      })
    );

    // 2. Redirect away from public pages when already authenticated
    const PUBLIC_PATHS = ['/login'];
    const isPublicPath = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

    if (isPublicPath) {
      router.replace('/dashboard');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
