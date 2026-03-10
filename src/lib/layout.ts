/** Shared layout classes so page titles and content align across Gallery, Story, Contact */

export const PAGE_MAIN_CLASS = "min-h-screen pt-[134px] pb-16";

export const PAGE_CONTENT_CLASS =
  "mx-auto w-full max-w-6xl px-6 md:px-8 lg:px-12";

/** Narrower content width for Contact (original was max-w-5xl) */
export const PAGE_CONTENT_CLASS_NARROW =
  "mx-auto w-full max-w-5xl px-6 md:px-8 lg:px-12";

export const PAGE_TITLE_CLASS =
  "font-display text-[2.3rem] tracking-tight hidden md:block";

/** Title when a short description sits under it (Gallery, Contact) — same size, shared spacing */
export const PAGE_TITLE_WITH_DESC_CLASS =
  "font-display text-[2.3rem] tracking-tight hidden md:block";

/** Single-line description under page title — tighter top margin on mobile */
export const PAGE_DESC_CLASS =
  "mt-3 font-sans text-base tracking-wide text-foreground-muted md:mt-6 md:text-lg";
