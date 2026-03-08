"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type GalleryItemProps = {
  image: string;
  url: string;
};

export function GalleryItem({ image, url }: GalleryItemProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="View post on Instagram"
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-[filter] duration-400 group-hover:brightness-95 group-hover:contrast-[1.02]"
        />
        <span
          className="absolute inset-0 bg-foreground/0 transition-colors duration-400 group-hover:bg-foreground/[0.06]"
          aria-hidden
        />
      </motion.div>
      {/* White border on hover — overlay inset by 2px so border sits inside and isn't clipped */}
      <span
        className="pointer-events-none absolute inset-[2px] border-2 border-transparent transition-colors duration-300 group-hover:border-white/90"
        aria-hidden
      />
    </Link>
  );
}
