import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EliteOps Global (EOG) | Global Back Office & Digital Solutions Partner',
  description: 'Helping businesses scale with Virtual Assistance, Web Development, Administrative Support, Insurance Processing, Educational ERPs, and Business Automation.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'EliteOps Global | Digital Solutions Partner',
    description: 'Enterprise virtual staffing, technology, back office data processing and custom Next.js web applications.',
    url: 'https://eliteog.vercel.app/',
    siteName: 'EliteOps Global',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'EliteOps Global Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EliteOps Global | Back Office Solutions',
    description: 'Enterprise virtual staffing and back office solutions.',
    images: ['/logo.png'],
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-navy-950 text-gray-100 min-h-screen flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
