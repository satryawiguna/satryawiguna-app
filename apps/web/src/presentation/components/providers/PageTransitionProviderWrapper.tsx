'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const PageTransitionProvider = dynamic(
  () =>
    import(
      '@/presentation/components/providers/PageTransitionProvider'
    ).then((mod) => mod.PageTransitionProvider),
  { ssr: false },
);

interface PageTransitionProviderWrapperProps {
  children: ReactNode;
}

export function PageTransitionProviderWrapper({ children }: PageTransitionProviderWrapperProps) {
  return <PageTransitionProvider>{children}</PageTransitionProvider>;
}
