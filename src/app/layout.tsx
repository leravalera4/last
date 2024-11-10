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
<head>
 <title>Shoppy Scan</title>
 <meta name="google-site-verification" content="j0SKXll7FJFhpuNBjySgfPXEnc-UOLgsQAnoeGTn6l0" />
          <meta name="description" content="Spend wisely" />
        <meta name="keywords" content="spend,compare,save,money,products,grocery,nofrills,fortinos" />
        <meta property="og:title" content="Shoppy Scan" />
        <meta property="og:description" content="Spend wisely" />
        <meta property="og:image" content="URL изображения для соцсетей" />
        <meta property="og:url" content="https://shoppyscan.ca" />
        <meta name="robots" content="index, follow, save, compare" />
  <Script async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262441687811052"
          crossOrigin="anonymous"/>
</head>
      <body className={inter.className}>
            <Header />
            {children}
           <SpeedInsights />
            <Analytics />
      </body>
    </html>
  )
}
