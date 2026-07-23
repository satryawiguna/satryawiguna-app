import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, Inter } from 'next/font/google';
import { MuiThemeProvider } from '@/presentation/components/providers/MuiThemeProvider';
import { PageTransitionProviderWrapper } from '@/presentation/components/providers/PageTransitionProviderWrapper';
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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://satryawiguna.me';
const ogImage = `${siteUrl}/assets/images/social/profile.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Satrya Wiguna - Full Stack Developer',
    description: 'Building Digital Excellence Through Full Stack Mastery',
    type: 'website',
    url: siteUrl,
    siteName: 'Satrya Wiguna',
    images: [
      {
        url: ogImage,
        width: 800,
        height: 800,
        alt: 'Satrya Wiguna - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@satryawiguna',
    title: 'Satrya Wiguna - Full Stack Developer',
    description: 'Building Digital Excellence Through Full Stack Mastery',
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
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
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning>
        <MuiThemeProvider>
          <ContactDrawerProvider>
            <PageTransitionProviderWrapper>
              <Providers>{children}</Providers>
              <ContactDrawer />
            </PageTransitionProviderWrapper>
          </ContactDrawerProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
