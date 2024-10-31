import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from 'src/components/header'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoppy Scan',
  description: 'Spend Wisely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <Header />
            {children}
           <SpeedInsights />
            <Analytics />
            <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262441687811052"
     crossOrigin="anonymous"></Script>
      </body>
    </html>
  )
}
