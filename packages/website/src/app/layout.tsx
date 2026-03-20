import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/constants";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-outfit",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Early connection to Spline CDN for faster 3D scene download */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body
        className={`${outfit.variable} ${rubik.variable} font-body antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              author: {
                "@type": "Person",
                name: siteConfig.author,
              },
            }),
          }}
        />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
