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
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-8 ${isHome ? "hidden md:flex flex-row items-center justify-end" : "flex flex-col gap-4 items-center md:flex-row md:items-center md:justify-between"}`}
      role="banner"
    >
      {/* Gradient behind nav (non-home) so nav stays visible when content scrolls under it */}
      {!isHome && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[9rem] bg-gradient-to-b from-black via-black/85 to-transparent md:h-[7rem]"
          aria-hidden
        />
      )}
      {!isHome && (
        <Link
          href="/"
          className="relative z-10 font-display text-2xl tracking-[0.25em] uppercase text-foreground transition-opacity duration-500 ease-in hover:opacity-80 focus:opacity-80 lg:text-2xl"
          aria-label="Ermir Zeneli — Home"
        >
          Ermir Zeneli
        </Link>
      )}
      <nav aria-label="Main navigation" className="relative z-10 flex w-full items-center justify-between md:w-auto md:justify-start md:gap-8">
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`group relative inline-block text-sm tracking-widest uppercase transition-colors duration-500 ease-in md:text-base ${
                isActive
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground focus:text-foreground"
              }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 right-0 block h-px bg-foreground/90 transition-[transform] duration-500 ease-in ${
                  isActive ? "origin-left scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
