import { normalizeSiteUrl } from "./url-utils";

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

const metadataBaseUrl = new URL(siteUrl);

export const siteMetadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: "Quantum Leap Digital | Modern Digital Marketing Agency",
    template: "%s | Quantum Leap Digital",
  },
  description:
    "Transform your digital presence with our innovative marketing strategies and solutions.",
  keywords: [
    "digital marketing",
    "marketing agency",
    "SEO",
    "social media marketing",
    "web design and development",
    "brand strategy",
    "digital marketing agency",
    "SEO services",
    "social media marketing agency",
    "web design and development agency",
    "brand strategy agency",
    "digital marketing services",
    "SEO services agency",
    "social media marketing services",
  ],
  authors: [{ name: "Quantum Leap Digital" }],
  creator: "Quantum Leap Digital",
  publisher: "Quantum Leap Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logo1.png",
    shortcut: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Quantum Leap Digital",
    title: "Quantum Leap Digital | Modern Digital Marketing Agency",
    description:
      "Transform your digital presence with our innovative marketing strategies and solutions.",
    images: [
      {
        url: "/images/logo1.png",
        width: 1200,
        height: 630,
        alt: "Quantum Leap Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Leap Digital | Modern Digital Marketing Agency",
    description:
      "Transform your digital presence with our innovative marketing strategies and solutions.",
    images: ["/images/logo1.png"],
    creator: "@quantumleapdigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};
