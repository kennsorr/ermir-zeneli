/** Canonical site URL — keep in sync with `metadataBase` in app/layout.tsx */
export const SITE_URL = "https://ermirzeneli.com" as const;

export const SITE_NAME = "Ermir Zeneli";

/** Default meta description for the home page and fallbacks */
export const DEFAULT_DESCRIPTION =
  "Ermir Zeneli — male model. Editorial and high-fashion portfolio. Based in Dubai; Milan and Paris fashion weeks. Cinematic imagery and premium representation.";

/** Shared Open Graph / Twitter preview (1200×630 recommended; existing hero asset) */
export const DEFAULT_OG_IMAGE_PATH = "/images/hero/panel-3.png";

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
