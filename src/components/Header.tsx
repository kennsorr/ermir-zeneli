"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-6 py-5 md:px-8 ${isHome ? "justify-end" : "justify-between"}`}
      role="banner"
    >
      {!isHome && (
        <Link
          href="/"
          className="font-display text-base tracking-[0.25em] uppercase text-foreground transition-opacity duration-500 ease-in hover:opacity-80 focus:opacity-80 md:text-lg"
          aria-label="Ermir Zeneli — Home"
        >
          Ermir Zeneli
        </Link>
      )}
      <nav aria-label="Main navigation" className="flex items-center gap-8">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="group relative inline-block text-sm tracking-widest uppercase text-foreground-muted transition-colors duration-500 ease-in hover:text-foreground focus:text-foreground md:text-base"
          >
            {label}
            <span
              className="absolute bottom-0 left-[0.1em] right-[0.1em] block h-px origin-left scale-x-0 bg-foreground/90 transition-[transform] duration-500 ease-in group-hover:scale-x-100"
              aria-hidden
            />
          </Link>
        ))}
      </nav>
    </header>
  );
}
