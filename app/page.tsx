import type { Metadata } from "next";
import { TriptychHero } from "@/components/TriptychHero";
import { HomePageClient } from "@/components/HomePageClient";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — male model | Editorial & runway portfolio`,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — male model | Editorial & runway portfolio`,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE_PATH), alt: `${SITE_NAME} — editorial fashion portrait` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — male model | Editorial & runway portfolio`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
};

export default function HomePage() {
  return (
    <HomePageClient>
      <main className="relative h-[var(--app-vh,100dvh)] w-full overflow-hidden">
        <TriptychHero />
      </main>
    </HomePageClient>
  );
}
