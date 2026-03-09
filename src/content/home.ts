/**
 * Homepage triptych hero content.
 * Replace image paths with final assets in /public/images/hero/ (see public/images/hero/README.md).
 * Until then, panels fall back to /images/placeholder.svg on load error.
 */
export const homePanels = [
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/gallery",
    image: "/images/hero/panel-1.jpg",
    imageHover: "/images/hero/panel-1-hover.jpg",
    grayscaleFilter: true,
  },
  {
    id: "story",
    label: "Story",
    href: "/about",
    image: "/images/hero/panel-2.jpg",
    imageHover: "/images/hero/panel-2-hover.jpg",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    image: "/images/hero/panel-3.png",
    imageHover: "/images/hero/panel-3-hover.png",
    /** Apply grayscale via CSS so this panel displays B&W. */
    grayscaleFilter: true,
  },
] as const;

export type HomePanel = (typeof homePanels)[number];
