import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rizky Mema',
  description: 'Portofolio Rizky Mema',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="relative antialiased">
        {children}
      </body>
    </html>
  );
}
