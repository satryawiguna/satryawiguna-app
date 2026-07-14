'use client';

import { useEffect, useState, useRef } from 'react';

export interface LoadingBarProps {
  visible: boolean;
  color?: string;
}

export function LoadingBar({ visible, color = '#00dbe9' }: LoadingBarProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    } else {
      // Delay unmount to allow fade-out transition to complete
      hideTimerRef.current = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className="loading-bar"
      data-visible={visible}
      style={
        {
          '--loading-bar-color': color,
        } as React.CSSProperties
      }
    >
      <div className="loading-bar__track" />
    </div>
  );
}
