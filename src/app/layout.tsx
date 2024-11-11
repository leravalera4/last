import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from 'src/components/header'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoppy Scan',
  description: 'Spend Wisely',
  keywords: 'spend,compare,save,money,products,grocery,nofrills,fortinos,compare prices,best deals,shopping deals,compare prices between stores,great deals,shopping price comparison,site to compare prices of products,sale price finder',
  openGraph: {
    title: 'Shoppy Scan',
    description: 'Spend wisely',
    image: '/ms-icon-70x70.png', // Замените на путь к вашему изображению
    url: 'https://shoppyscan.ca',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="j0SKXll7FJFhpuNBjySgfPXEnc-UOLgsQAnoeGTn6l0" />
        <meta name="description" content="Spend wisely" />
        <meta name="keywords" content="spend,compare,save,money,products,grocery,nofrills,fortinos,compare prices,best deals,shopping deals,compare prices between stores,great deals,shopping price comparison,site to compare prices of products,sale price finder" />
        <meta property="og:title" content="Shoppy Scan" />
        <meta property="og:description" content="Spend wisely" />
        <meta property="og:image" content="/social-image.png" />
        <meta property="og:url" content="https://shoppyscan.ca" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <Script async 
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262441687811052"
                crossOrigin="anonymous" />
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
