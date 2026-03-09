"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer
      className="border-t border-foreground/10 py-4 text-center"
      role="contentinfo"
    >
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-foreground/75">
        Website created by{" "}
        <a
          href="https://www.sorrell.info"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-foreground/50 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground/70"
        >
          sorrell.info
        </a>
      </p>
    </footer>
  );
}
