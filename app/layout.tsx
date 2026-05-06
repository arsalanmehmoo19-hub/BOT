import type {Metadata} from 'next';
import { Inter, Outfit, Alex_Brush } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

const alexBrush = Alex_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'I.A Clothing - Elevating Everyday Confidence',
  description: 'A modern, editorial-focused desktop-first fashion marketplace.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${alexBrush.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#F4F4F2] text-[#1A1A1A]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
