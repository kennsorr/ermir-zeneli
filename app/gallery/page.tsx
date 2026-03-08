import { galleryItems, instagramProfileUrl } from "@/content/gallery";
import { GalleryItem } from "@/components/GalleryItem";

export const metadata = {
  title: "Gallery",
  description: "Ermir Zeneli — gallery of editorial and fashion work. See more on Instagram.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h1 className="font-display text-5xl tracking-tight md:text-6xl">
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
            className="transition-colors hover:text-foreground"
          >
            See more on Instagram
          </a>
        </p>
      </div>
    </main>
  );
}
