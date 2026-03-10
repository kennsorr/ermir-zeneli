import { galleryItems, instagramProfileUrl } from "@/content/gallery";
import { GalleryItem } from "@/components/GalleryItem";
import { PAGE_MAIN_CLASS, PAGE_CONTENT_CLASS, PAGE_TITLE_CLASS } from "@/lib/layout";

export const metadata = {
  title: "Gallery",
  description: "Ermir Zeneli — gallery of editorial and fashion work. See more on Instagram.",
};

export default function GalleryPage() {
  return (
    <main className={PAGE_MAIN_CLASS}>
      <div className={PAGE_CONTENT_CLASS}>
        <h1 className={PAGE_TITLE_CLASS}>
          Gallery
        </h1>
        <p className="mt-6 font-sans text-base tracking-wide text-foreground-muted md:text-lg">
          Editorial and fashion work.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <GalleryItem key={index} image={item.image} url={item.url} />
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
