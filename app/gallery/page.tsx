import type { Metadata } from "next";
import { galleryItems, instagramProfileUrl } from "@/content/gallery";
import { GalleryItem } from "@/components/GalleryItem";
import { PAGE_MAIN_CLASS, PAGE_CONTENT_CLASS, PAGE_TITLE_WITH_DESC_CLASS, PAGE_DESC_CLASS } from "@/lib/layout";
import { DEFAULT_OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "@/lib/seo";

const galleryDescription =
  "Ermir Zeneli — gallery of editorial and fashion work. Milan, Paris, Dubai. See more on Instagram.";

export const metadata: Metadata = {
  title: "Gallery",
  description: galleryDescription,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery | ${SITE_NAME}`,
    description: galleryDescription,
    url: absoluteUrl("/gallery"),
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE_PATH), alt: `${SITE_NAME} — gallery preview` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Gallery | ${SITE_NAME}`,
    description: galleryDescription,
    images: [absoluteUrl(DEFAULT_OG_IMAGE_PATH)],
  },
};

export default function GalleryPage() {
  return (
    <main className={PAGE_MAIN_CLASS}>
      <div className={PAGE_CONTENT_CLASS}>
        <h1 className={PAGE_TITLE_WITH_DESC_CLASS}>
          Gallery
        </h1>
        <p className={PAGE_DESC_CLASS}>
          Editorial and fashion work.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <GalleryItem key={index} image={item.image} url={item.url} alt={item.alt} />
          ))}
        </div>

        <p className="mt-16 text-center font-sans text-sm tracking-widest uppercase text-foreground-muted">
          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            See more on Instagram
            <span className="inline-block text-[0.9em]" aria-hidden>↗</span>
          </a>
        </p>
      </div>
    </main>
  );
}
