import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "src/components/header";
import Footer from "src/components/footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Chatbot from "src/components/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://shoppyscan.ca"),

  title: "Shoppy Scan - Your Ultimate Price Comparison Tool for Grocery Deals",
  description:
    "Discover the best grocery deals and compare prices effortlessly with Shoppy Scan. Save time and money on your favorite products across top stores in Canada.",

  keywords: [
    "compare grocery prices Canada",
    "grocery store price comparison",
    "best grocery deals Canada",
    "nofrills vs fortinos",
    "cheapest grocery store Toronto",
    "grocery price checker app",
    "Loblaws flyer deals",
    "Walmart vs No Frills groceries",
    "find cheapest grocery items",
    "save on groceries Canada",
  ],

  openGraph: {
    title:
      "Shoppy Scan - Your Ultimate Price Comparison Tool for Grocery Deals",
    description:
      "Discover the best grocery deals and compare prices effortlessly with Shoppy Scan. Save time and money on your favorite products across top stores in Canada.",
    type: "website",
    locale: "en_US",
    url: "https://shoppyscan.ca",
    siteName: "Shoppy Scan",
    images: [
      {
        url: "https://shoppyscan.ca/graph.png",
        width: 1200,
        height: 630,
        alt: "Shoppy Scan Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@shoppyscan", // если нет Twitter — можно убрать
    title:
      "Shoppy Scan - Your Ultimate Price Comparison Tool for Grocery Deals",
    description:
      "Compare grocery prices across top Canadian stores and save money every week.",
    images: ["https://shoppyscan.ca/graph.png"],
  },

  alternates: {
    canonical: "https://shoppyscan.ca",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="google-site-verification"
          content="j0SKXll7FJFhpuNBjySgfPXEnc-UOLgsQAnoeGTn6l0"
        />
        <meta name="description" content="Spend wisely" />
        <meta
          name="keywords"
          content="groceries,spend,compare,save,money,products,grocery,nofrills,fortinos,compare prices,best deals,shopping deals,compare prices between stores,great deals,shopping price comparison,site to compare prices of products,sale price finder"
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://shoppyscan.ca" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1262441687811052"
          crossOrigin="anonymous"
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Shoppy Scan",
  "url": "https://shoppyscan.ca",
  "description": "Compare grocery prices across Canada and find the best deals from Loblaws, No Frills, Walmart, and more.",
  "applicationCategory": "ShoppingApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "CAD"
  },
  "creator": {
    "@type": "Organization",
    "name": "Shoppy Scan"
  }
}
`}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SYZK17BNW5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SYZK17BNW5');
        `}
        </Script>
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qtvbcjas31");
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
