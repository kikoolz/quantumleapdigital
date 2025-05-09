import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ClientProviders } from "@/components/providers/client-providers";
import Newsletter from "@/components/shared/newsletter";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Quantum Leap Digital | Modern Digital Marketing Agency",
  description:
    "Transform your digital presence with our innovative marketing strategies and solutions.",
  icons: {
    icon: "/images/logo1.png",
    shortcut: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-[#030303] text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
          <Newsletter />
          <Footer />
          <ClientProviders />
        </ThemeProvider>
      </body>
    </html>
  );
}
