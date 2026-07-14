'use client';

import { useState, useCallback } from 'react';

export interface BlurOverlayProps {
  show: boolean;
  duration?: number;
  blurAmount?: number;
  onComplete?: () => void;
}

export function BlurOverlay({
  show,
  duration = 1500,
  blurAmount = 16,
  onComplete,
}: BlurOverlayProps) {
  const [isAnimating, setIsAnimating] = useState(show);

  const handleAnimationEnd = useCallback(() => {
    setIsAnimating(false);
    onComplete?.();
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      className="blur-overlay"
      data-animating={show}
      style={
        {
          '--blur-duration': `${duration}ms`,
          '--blur-amount': `${blurAmount}px`,
        } as React.CSSProperties
      }
      onAnimationEnd={handleAnimationEnd}
    />
  );
}
