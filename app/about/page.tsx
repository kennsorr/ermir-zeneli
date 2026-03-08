import { StoryImage } from "@/components/StoryImage";

export const metadata = {
  title: "Story",
  description:
    "Ermir Zeneli — from Albania to the runways of Milan and Paris, now based in Dubai. Model and modeling coach.",
};

export default function AboutPage() {
  return (
    <main className="h-screen overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="grid h-full w-full grid-cols-1 gap-6 px-6 md:grid-cols-[1fr_1.1fr] md:gap-12 md:px-12 lg:px-16">
        {/* Left: text */}
        <div className="flex min-h-0 flex-col justify-center overflow-hidden">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
            Story
          </h1>
          <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-foreground-muted md:mt-8 md:space-y-4 md:text-base lg:text-lg">
            <p>
              Ermir Zeneli grew up in Albania. He started modeling at 19, when
              he moved to China—first to Chongqing—and began building his career.
              Since then he has traveled to many countries, walking for fashion
              weeks in Milan and Paris and teaching modeling classes along the
              way.
            </p>
            <p>
              He is now based in Dubai, where he continues to model and teach,
              helping shape the next generation of talent while staying active in
              front of the camera.
            </p>
          </div>
        </div>

        {/* Right: image — constrained size so image scales down and isn’t cropped */}
        <div className="flex min-h-0 items-center justify-center md:justify-end">
          <figure className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-background md:max-w-md">
            <StoryImage />
          </figure>
        </div>
      </div>
    </main>
  );
}
