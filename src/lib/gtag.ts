export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.(
    "event",
    "page_view",
    { page_location: url }
  );
}

export function event(
  action: string,
  params?: Record<string, unknown>
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.(
    "event",
    action,
    params
  );
}
