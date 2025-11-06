import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { ClientProviders } from "@/components/providers/client-providers";
import Newsletter from "@/components/shared/newsletter";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import type React from "react";

import { siteMetadata, siteUrl } from "@/lib/metadata";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quantum Leap Digital",
    description:
      "Transform your digital presence with our innovative marketing strategies and solutions.",
    url: siteUrl,
    logo: `${siteUrl}/images/logo1.png`,
    sameAs: [
      // Add your social media URLs here when available
      // "https://twitter.com/quantumleapdigital",
      // "https://facebook.com/quantumleapdigital",
      // "https://linkedin.com/company/quantumleapdigital",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-[#030303] text-white`}>
        <script id="structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Newsletter />
          <Footer />
          <ClientProviders />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
