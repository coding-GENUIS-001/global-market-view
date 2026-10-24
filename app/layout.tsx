import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Global Market View',
  description: 'Dark trading style dashboard for world markets, rates, and companies.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
