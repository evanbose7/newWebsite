import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Minimalist Word Reveal',
  description: 'Pure minimalist kinetic word-by-word typography reveal experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased min-h-screen">
        <main className="min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
