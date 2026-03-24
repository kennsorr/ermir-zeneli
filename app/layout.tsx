import type { Metadata, Viewport } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "@/lib/seo";

const Analytics = dynamic(
  () => import("@/components/Analytics").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ermirzeneli.com"),
  title: {
    default: `${SITE_NAME} — Fashion model & editorial portfolio`,
    template: "%s | Ermir Zeneli",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: "https://ermirzeneli.com" }],
  creator: SITE_NAME,
  keywords: [
    "Ermir Zeneli",
    "fashion model",
    "male model",
    "editorial model",
    "Dubai model",
    "Milan fashion week",
    "Paris fashion week",
    "modeling portfolio",
  ],
  icons: {
    icon: [
      { url: "/images/favicon-pack/favicon.ico", sizes: "any" },
      { url: "/images/favicon-pack/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-pack/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-pack/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon-pack/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/images/favicon-pack/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon-pack/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/images/favicon-pack/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon-pack/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/images/favicon-pack/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon-pack/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/favicon-pack/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/images/favicon-pack/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
    ],
  },
  openGraph: {
    title: `${SITE_NAME} — Fashion model & editorial portfolio`,
    description: DEFAULT_DESCRIPTION,
    url: "https://ermirzeneli.com",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        alt: `${SITE_NAME} — editorial fashion portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Fashion model & editorial portfolio`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">
        <JsonLd />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
        <div className="grain-overlay" aria-hidden />
        <Header />
        <Analytics />
        {children}
        <Footer />
      </body>
    </html>
  );
}
