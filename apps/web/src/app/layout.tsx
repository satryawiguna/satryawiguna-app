import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { MuiThemeProvider } from '@/presentation/components/providers/MuiThemeProvider';
import { PageTransitionProvider } from '@/presentation/components/providers/PageTransitionProvider';
import { Providers } from '@/presentation/components/providers/Providers';
import { ContactDrawerProvider } from '@/presentation/components/home/ContactDrawerContext';
import { ContactDrawer } from '@/presentation/components/home/ContactDrawer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Satrya Wiguna - Full Stack Developer & Software Engineer',
  description:
    'Architecting high-performance web ecosystems with precision. I transform complex business logic into elegant, scalable software solutions.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Laravel',
    'AWS',
  ],
  openGraph: {
    title: 'Satrya Wiguna - Full Stack Developer',
    description: 'Building Digital Excellence Through Full Stack Mastery',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body suppressHydrationWarning>
        <MuiThemeProvider>
          <ContactDrawerProvider>
            <PageTransitionProvider>
              <Providers>{children}</Providers>
              <ContactDrawer />
            </PageTransitionProvider>
          </ContactDrawerProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
