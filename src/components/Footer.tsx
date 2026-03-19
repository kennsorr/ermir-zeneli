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
          href="https://consulting.sorrell.info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
        >
          sorrell.info
        </a>
      </p>
    </footer>
  );
}
