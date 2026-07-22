'use client';

import { useState, useCallback } from 'react';
import { sendContactUseCase } from '../../domain/usecases';
import type { SendContactRequest, SendContactResponse } from 'shared-types';

export interface UseContactFormReturn {
  send: (data: SendContactRequest) => Promise<SendContactResponse>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * Hook to handle contact form submission
 */
export const useContactForm = (): UseContactFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (data: SendContactRequest) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await sendContactUseCase.execute(data);
      setIsSubmitting(false);

      if (response.success) {
        setIsSuccess(true);
        return response;
      }

      setError(response.message || 'Something went wrong. Please try again later.');
      return response;
    } catch (err: any) {
      setIsSubmitting(false);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again later.';
      setError(message);
      throw err;
    }
  }, []);

  const resetState = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return { send, isSubmitting, isSuccess, error, reset: resetState };
};
