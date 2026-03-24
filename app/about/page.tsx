import type { Metadata } from "next";
import { StoryImage } from "@/components/StoryImage";
import { Measurements } from "@/components/Measurements";
import { PAGE_MAIN_CLASS, PAGE_CONTENT_CLASS, PAGE_TITLE_CLASS } from "@/lib/layout";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const aboutDescription =
  "Ermir Zeneli — from Albania to the runways of Milan and Paris, now based in Dubai. Male fashion model and modeling coach.";

export const metadata: Metadata = {
  title: "Story",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Story | ${SITE_NAME}`,
    description: aboutDescription,
    url: absoluteUrl("/about"),
    images: [
      {
        url: absoluteUrl("/images/about/story.png"),
        alt: `${SITE_NAME} — portrait on the About page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Story | ${SITE_NAME}`,
    description: aboutDescription,
    images: [absoluteUrl("/images/about/story.png")],
  },
};

export default function AboutPage() {
  return (
    <main className={PAGE_MAIN_CLASS}>
      <div className={PAGE_CONTENT_CLASS}>
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
          {/* Left: text */}
          <div className="flex min-h-0 flex-col overflow-hidden">
            <h1 className={PAGE_TITLE_CLASS}>
              Story
            </h1>
            <div className="mt-[35px] space-y-3 font-sans text-sm leading-relaxed text-foreground-muted md:space-y-4 md:text-base lg:text-lg">
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
            <Measurements />
          </div>

          {/* Right: image — 3D tilt card with drop shadow */}
          <div className="flex min-h-0 items-center justify-center md:justify-end">
            <div className="w-full max-w-[280px] md:max-w-sm" style={{ perspective: "900px" }}>
              <StoryImage />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
