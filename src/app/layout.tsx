import type {Metadata} from 'next';
import './globals.css';
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'SafeStay',
  description: 'Find safe and verified flats and roommates for female students.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-body`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </head>
      <body className="antialiased bg-background">
        <div className="relative flex min-h-screen flex-col">
            <Header /> 
            <main className="flex-1 pt-20">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}