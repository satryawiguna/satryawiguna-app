import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DateProvider } from '@/presentation/components/providers/DateProvider';
import { PageTransitionProvider } from '@/presentation/components/providers/PageTransitionProvider';
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
              <PageTransitionProvider>
                <Providers>{children}</Providers>
              </PageTransitionProvider>
            </DateProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
