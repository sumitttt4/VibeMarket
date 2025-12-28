import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Primary Typography - Inter (UI/Body)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Editorial Typography - Instrument Serif (Headlines)
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Code Typography - JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VibeMarket | Discovery for AI-Built Apps",
    template: "%s | VibeMarket",
  },
  description:
    "Find AI-built tools by country, use case, and how they were made. A discovery layer for vibe-coded apps.",
  keywords: [
    "vibe coding",
    "AI apps",
    "v0",
    "cursor",
    "lovable",
    "bolt",
    "replit",
    "AI-built tools",
  ],
  authors: [{ name: "VibeMarket" }],
  creator: "VibeMarket",
  publisher: "VibeMarket",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibemarket.dev",
    siteName: "VibeMarket",
    title: "VibeMarket | Discovery for AI-Built Apps",
    description:
      "Find AI-built tools by country, use case, and how they were made.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VibeMarket - Discovery for AI-Built Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeMarket | Discovery for AI-Built Apps",
    description:
      "Find AI-built tools by country, use case, and how they were made.",
    images: ["/og-image.png"],
    creator: "@vibemarket",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9F9F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        {/* Subtle background */}
        <div className="fixed inset-0 -z-10 bg-limestone dark:bg-zinc-950" />

        {/* Main Content */}
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
