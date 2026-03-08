import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ermirzeneli.com"),
  title: {
    default: "Ermir Zeneli",
    template: "%s | Ermir Zeneli",
  },
  description:
    "Ermir Zeneli — male model. Editorial, high-fashion portfolio. Cinematic imagery and premium representation.",
  openGraph: {
    title: "Ermir Zeneli",
    description:
      "Ermir Zeneli — male model. Editorial, high-fashion portfolio.",
    url: "https://ermirzeneli.com",
    siteName: "Ermir Zeneli",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ermir Zeneli",
    description: "Ermir Zeneli — male model. Editorial, high-fashion portfolio.",
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
        <div className="grain-overlay" aria-hidden />
        <Header />
        {children}
      </body>
    </html>
  );
}
