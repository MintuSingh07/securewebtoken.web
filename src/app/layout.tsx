import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://secure-web-token.vercel.app"),
  title: "SWT - Secure Web Token | Next-Gen Alternative to JWT",
  description: "Secure Web Token (SWT) offers AES-256-GCM encrypted, device-bound session tokens. A more secure, modern alternative to JWT for web authentication.",
  keywords: ["SWT", "Secure Web Token", "JWT alternative", "Authentication", "Session Management", "AES-256-GCM", "Device Binding", "Secure Authentication", "Node.js Auth", "Web Security"],
  authors: [{ name: "SWT Team" }],
  creator: "SWT Team",
  publisher: "SWT Team",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "SWT - Secure Web Token | Beyond JWT",
    description: "Device-bound, server-side session tokens with AES-256-GCM encryption. Prevent token theft and unauthorized reuse.",
    url: "https://secure-web-token.vercel.app",
    siteName: "Secure Web Token",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Secure Web Token - Better than JWT",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SWT - Secure Web Token | Beyond JWT",
    description: "AES-256-GCM encrypted, device-bound session tokens. A modern alternative to JWT.",
    images: ["/og-image.png"],
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
    google: "IXjwqwHvAzdGs3gCB18jasAdFqrs4-SsBhYyXOSQ33c",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Secure Web Token (SWT)",
  "operatingSystem": "Any",
  "applicationCategory": "SecurityApplication",
  "description": "A secure alternative to JWT that provides AES-256-GCM encryption and device binding to prevent token theft.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Secure Web Token"
  }
};

import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Toaster position="top-right" richColors />
        <SmoothScroll />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="b6c4f181-7ace-4ae6-bdd4-527a88192d21"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
