'use client';

import type { ReactNode } from 'react';
import { LoadingBar, BlurOverlay } from 'ui';
import { usePageTransition } from '@/presentation/hooks/usePageTransition';

interface PageTransitionProviderProps {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const { isNavigating, showInitialBlur, onBlurComplete } = usePageTransition();

  return (
    <>
      <LoadingBar visible={isNavigating} color="#0ea5e9" />
      <BlurOverlay show={showInitialBlur} onComplete={onBlurComplete} />
      {children}
    </>
  );
}
