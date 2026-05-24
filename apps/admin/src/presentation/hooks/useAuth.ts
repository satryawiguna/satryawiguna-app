'use client';

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from 'shared-store';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  clearAuthError,
  selectAuth,
  selectIsAuthenticated,
  selectAuthUser,
} from 'shared-store';
import { apiClient } from 'shared-api';
import { AuthData } from 'shared-types';
import { initiate2faUseCase } from '../../domain/usecases/initiate2fa';
import { verify2faUseCase } from '../../domain/usecases/verify2fa';

/**
 * Hook for 2FA login flow
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');

  const initiateMutation = useMutation({
    mutationFn: (emailValue: string) => initiate2faUseCase.execute({ email: emailValue }),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (_data, emailValue) => {
      setEmail(emailValue);
      setStep('otp');
      dispatch(clearAuthError());
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to initiate challenge. Please try again.';
      dispatch(loginFailure(message));
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (otp: string) => verify2faUseCase.execute({ email, otp }),
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (response) => {
      const { accessToken, refreshToken, tokenType, expiresIn, refreshExpiresIn, user } =
        response.data;

      const authData: AuthData = {
        isLogin: true,
        accessToken,
        refreshToken,
        tokenType,
        expiresIn,
        refreshExpiresIn,
        user,
      };

      apiClient.setAuthData(authData);

      // Set a client cookie so middleware can guard routes server-side.
      // Lifetime matches the refresh token (7 days = 604800 seconds).
      document.cookie = `auth-token=${accessToken}; path=/; max-age=604800; SameSite=Lax`;

      dispatch(
        loginSuccess({ accessToken, refreshToken, tokenType, expiresIn, refreshExpiresIn, user })
      );
      const returnUrl = searchParams.get('returnUrl');
      router.push(returnUrl ?? '/dashboard');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Invalid verification code. Please try again.';
      dispatch(loginFailure(message));
    },
  });

  const initiateChallenge = useCallback(
    (emailValue: string) => {
      initiateMutation.mutate(emailValue);
    },
    [initiateMutation]
  );

  const verifyOtp = useCallback(
    (otp: string) => {
      verifyMutation.mutate(otp);
    },
    [verifyMutation]
  );

  const goBackToEmail = useCallback(() => {
    setStep('email');
    dispatch(clearAuthError());
  }, [dispatch]);

  return {
    step,
    email,
    initiateChallenge,
    verifyOtp,
    goBackToEmail,
    isInitiating: initiateMutation.isPending,
    isVerifying: verifyMutation.isPending,
    error: initiateMutation.error || verifyMutation.error,
  };
};

/**
 * Hook for logout
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = useCallback(async () => {
    // Call logout API endpoint (fire-and-forget)
    try {
      await apiClient.post('/v1/auth/logout');
    } catch {
      // Ignore API errors — clear local state regardless
    }

    apiClient.clearAuthData();

    // Clear the middleware cookie
    document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Lax';

    dispatch(logoutAction());
    router.push('/login');
  }, [dispatch, router]);

  return { logout };
};

/**
 * Hook to read auth state
 */
export const useAuthState = () => {
  const auth = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthUser);
  return { auth, isAuthenticated, user };
};
