import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from 'src/components/header'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {

  metadataBase : new URL("https://shoppyscan.ca"),

  title: 'Shoppy Scan - Your Ultimate Price Comparison Tool for Grocery Deals',
  description: 'Discover the best grocery deals and compare prices effortlessly with Shoppy Scan. Save time and money on your favorite products across top stores in Canada.',
   keywords:["spend","compare","save", "money","products","grocery","nofrills","fortinos","compare prices","best deals","shopping deals","compare prices between stores","great deals","shopping price comparison","site to compare prices of products","sale price finder"],  
openGraph:{
    title:'Shoppy Scan - Your Ultimate Price Comparison Tool for Grocery Deals',
    description: 'Discover the best grocery deals and compare prices effortlessly with Shoppy Scan. Save time and money on your favorite products across top stores in Canada.',
    type:'website',
    locale:'en_US',
    url:'https://shoppyscan.ca',
    siteName:"Shoppy Scan",
images: [
      {
        url: 'https://shoppyscan.ca/graph.png',
        width: 1200,
        height: 630,
        alt: 'Shoppy Scan Logo'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
       <meta name="google-adsense-account" content="ca-pub-4646397629011500"/>
        <meta name="description" content="Spend wisely" />
        <meta name="keywords" content="groceries,spend,compare,save,money,products,grocery,nofrills,fortinos,compare prices,best deals,shopping deals,compare prices between stores,great deals,shopping price comparison,site to compare prices of products,sale price finder" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://shoppyscan.ca" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262441687811052" crossOrigin="anonymous" />
<Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qtvbcjas31");
          `}
        </Script>
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
