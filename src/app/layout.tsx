import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { RootLayout } from '@/layout/RootLayout';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Optifi - DeFi Aggregator on Monad',
  description: 'A next-generation DeFi aggregator on the Monad network',
  viewport: 'width=device-width, initial-scale=1',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <RootLayout>
            {children}
          </RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
} 