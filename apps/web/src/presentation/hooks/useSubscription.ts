'use client';

import { useState, useCallback } from 'react';
import { subscribeUseCase } from '../../domain/usecases';

export interface UseSubscriptionReturn {
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

/**
 * Hook to handle newsletter subscription
 */
export const useSubscription = (): UseSubscriptionReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await subscribeUseCase.execute({ email });
      setIsLoading(false);

      if (response.success) {
        setIsSuccess(true);
        return { success: true, message: response.message };
      }

      setError(response.message || 'Something went wrong. Please try again later.');
      return { success: false, message: response.message };
    } catch (err: any) {
      setIsLoading(false);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again later.';
      setError(message);
      return { success: false, message };
    }
  }, []);

  return { subscribe, isLoading, isSuccess, error };
};
