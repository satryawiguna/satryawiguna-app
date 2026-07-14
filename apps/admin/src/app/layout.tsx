import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DateProvider } from '@/presentation/components/providers/DateProvider';
import { PageTransitionProviderWrapper } from '@/presentation/components/providers/PageTransitionProviderWrapper';
import { Providers } from '@/presentation/components/providers/Providers';
import { theme } from '@/presentation/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DateProvider>
              <CssBaseline />
              <PageTransitionProviderWrapper>
                <Providers>{children}</Providers>
              </PageTransitionProviderWrapper>
            </DateProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
