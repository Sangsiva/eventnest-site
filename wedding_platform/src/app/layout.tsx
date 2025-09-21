import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventNest - India\'s Largest Wedding and Event Planning Platform',
  description: 'Find & Book wedding and event services online in all Indian cities - Photographers, Makeup Artists, Venues, Bridal Lehengas, Decorators & more. See past work, compare quotations from vendors, get Contact Info. & read Latest Reviews. Follow the latest wedding and event trends, checklists, ideas & see photos only on EventNest Blog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
