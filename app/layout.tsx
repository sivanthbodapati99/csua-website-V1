import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSUA — Computer Science Undergraduate Association',
  description: "Berkeley's undergraduate computer science community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
