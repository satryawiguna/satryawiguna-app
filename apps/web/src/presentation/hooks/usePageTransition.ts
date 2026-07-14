'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface UsePageTransitionReturn {
  isNavigating: boolean;
  showInitialBlur: boolean;
  onBlurComplete: () => void;
}

export function usePageTransition(): UsePageTransitionReturn {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathname = useRef(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showInitialBlur, setShowInitialBlur] = useState(true);
  const navigatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect route changes
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Navigation occurred — show loading bar
      setIsNavigating(true);

      // Clear any existing timer
      if (navigatingTimerRef.current) {
        clearTimeout(navigatingTimerRef.current);
      }

      // Auto-hide after 500ms minimum
      navigatingTimerRef.current = setTimeout(() => {
        setIsNavigating(false);
      }, 500);
    }

    prevPathname.current = pathname;

    return () => {
      if (navigatingTimerRef.current) {
        clearTimeout(navigatingTimerRef.current);
      }
    };
  }, [pathname, searchParams]);

  const onBlurComplete = useCallback(() => {
    setShowInitialBlur(false);
  }, []);

  return {
    isNavigating,
    showInitialBlur,
    onBlurComplete,
  };
}
