const DEFAULT_SITE_URL = "https://quantumleapdigital.vercel.app";

function normalizeSiteUrl(rawValue: string | undefined): string {
  const trimmed = (rawValue ?? "").trim();

  // If empty after trim, use default immediately
  if (!trimmed) return DEFAULT_SITE_URL;

  // Remove trailing slashes
  const withoutTrailing = trimmed.replace(/\/+$/, "");

  // Ensure a scheme; treat protocol-relative URLs as https
  const protocolFixed = withoutTrailing.replace(/^\/\//, "https://");
  const withScheme = /^(https?:)\/\//i.test(protocolFixed)
    ? protocolFixed
    : `https://${protocolFixed}`;

  // Validate and fallback if invalid
  try {
    // new URL will throw if invalid; also normalizes the URL
    return new URL(withScheme).toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteMetadata = {
  metadataBase: new URL(siteUrl),
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
