"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion, type MotionValue } from "framer-motion";
import type { HomePanel } from "@/content/home";

const LINE_DURATION = 0.7;
const LINE_EASE = [0.22, 0.61, 0.36, 1] as const;

/** Panel reveals start only after the name animation (progress > NAME_PROGRESS_END). */
const LOAD_REVEAL_RANGES: [number, number][] = [
  [0.4, 0.65],
  [0.45, 0.75],
  [0.5, 0.85],
];

type TriptychPanelProps = HomePanel & {
  grayscaleFilter?: boolean;
  fallbackSrc?: string;
  loadProgress?: MotionValue<number>;
  panelIndex?: number;
  initialRevealDirection?: "top" | "bottom";
  /** Hover/line animation only runs after load progress passes this (e.g. when name animation is done). */
  nameAnimationEndProgress?: number;
};

export function TriptychPanel({
  id,
  label,
  href,
  image,
  imageHover,
  grayscaleFilter = false,
  fallbackSrc = "/images/placeholder.svg",
  loadProgress,
  panelIndex = 0,
  initialRevealDirection = "top",
  nameAnimationEndProgress = 0,
}: TriptychPanelProps) {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hoverImageError, setHoverImageError] = useState(false);

  const defaultSrc = imageError ? fallbackSrc : image;
  const hoverSrc = hoverImageError ? fallbackSrc : imageHover;

  const progress = useMotionValue(0);
  const lineTop = useTransform(progress, (v) => `${v * 100}%`);
  const lineOpacity = useTransform(progress, [0, 0.02], [0, 1]); // hidden at top when not animating
  const hoverClipPath = useTransform(progress, (v) => `inset(${(1 - v) * 100}% 0 0 0)`);
  const scale = useTransform(progress, [0, 1], [1, 1.03]);

  const oneMotion = useMotionValue(1);
  const progressForReveal = loadProgress ?? oneMotion;
  const [revealStart, revealEnd] = LOAD_REVEAL_RANGES[panelIndex] ?? [0.2, 0.7];
  const initialRevealProgress = useTransform(progressForReveal, [revealStart, revealEnd], [0, 1]);
  /** Black overlay slides down (top→bottom) or up (bottom→top) to reveal the image; no gradient/mask. */
  const overlayTranslate = useTransform(initialRevealProgress, (v) =>
    initialRevealDirection === "top"
      ? `translateY(${v * 100}%)`
      : `translateY(${-v * 100}%)`
  );
  const labelOpacity = useTransform(progressForReveal, [0.65, 0.95], [0, 1]);
  /** Dark overlay for name readability fades in after this panel’s reveal, then fades out on hover */
  const darkOverlayRevealed = useTransform(
    progressForReveal,
    [revealEnd - 0.05, revealEnd],
    [0, 1]
  );

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(progress, isHovered ? 1 : 0, {
      duration: isHovered ? LINE_DURATION : 0.25,
      ease: isHovered ? LINE_EASE : "easeOut",
    });
    return controls.stop;
  }, [isHovered, progress, reduceMotion]);

  const triggerHoverState = useCallback(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    if (loadProgress != null && progressForReveal.get() < nameAnimationEndProgress) return;
    setIsHovered(true);
  }, [reduceMotion, progress, loadProgress, progressForReveal, nameAnimationEndProgress]);

  const clearHoverState = useCallback(() => {
    setIsHovered(false);
    if (reduceMotion) progress.set(0);
  }, [progress, reduceMotion]);

  /* When reduced motion, second tap = navigate (progress stays at 1 so we don't prevent). */
  const isRevealed = reduceMotion ? isHovered : true;

  /* Mobile: first tap = wipe/reveal, second tap = navigate. */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (progress.get() === 1) return;
      e.preventDefault();
      triggerHoverState();
    },
    [progress, triggerHoverState]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (progress.get() === 1) return;
      e.preventDefault();
      triggerHoverState();
    },
    [progress, triggerHoverState]
  );

  return (
    <Link
      href={href}
      className="group relative flex h-full w-full flex-1 overflow-hidden focus:outline-none"
      onMouseEnter={triggerHoverState}
      onMouseLeave={clearHoverState}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      aria-label={`${label} — go to ${href}`}
    >
      {/* Panel label — fades in towards end of load; visible immediately when reduced motion */}
      <motion.div
        className="absolute bottom-4 left-4 z-30 inline-block"
        style={{ opacity: reduceMotion ? 1 : labelOpacity }}
      >
        <motion.span
          className="block font-sans tracking-[0.3em] uppercase text-foreground/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
          animate={{
            fontSize: isHovered ? "1rem" : "0.875rem",
          }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          aria-hidden
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute bottom-0 left-[0.05em] right-[0.05em] block h-px bg-foreground/90"
          style={{ originX: 0 }}
          initial={false}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          aria-hidden
        />
      </motion.div>

      {/* Image block — always visible; black overlay on top does the reveal */}
      <motion.div className="absolute inset-0 overflow-hidden">
      {/* Image container: scale subtly when revealed */}
      <motion.div
        className="absolute inset-0 origin-center"
        style={{ scale }}
      >
        {/* Default image — always visible underneath */}
        <Image
          src={defaultSrc}
          alt=""
          fill
          sizes="33vw"
          className="object-cover"
          style={{ filter: grayscaleFilter ? "grayscale(1) contrast(1)" : "contrast(1)" }}
          onError={() => setImageError(true)}
          priority
        />
        {/* Hover image — revealed by wipe (clip-path); slightly brighter so wipe is visible even if same asset */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={
            reduceMotion
              ? { opacity: isRevealed ? 1 : 0, transition: "opacity 0.4s ease" }
              : { clipPath: hoverClipPath }
          }
        >
          <Image
            src={hoverSrc}
            alt=""
            fill
            sizes="33vw"
            className="object-cover"
            style={{
              filter: grayscaleFilter
                ? "grayscale(1) contrast(1.12) brightness(1.06)"
                : "contrast(1.12) brightness(1.06)",
            }}
            onError={() => setHoverImageError(true)}
          />
        </motion.div>
      </motion.div>

      {/* Black overlay — slides down (left/right panels) or up (center) to reveal image; hidden when no load sequence */}
      {!reduceMotion && loadProgress && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] bg-black"
          style={{ transform: overlayTranslate }}
          aria-hidden
        />
      )}
      </motion.div>

      {/* Dark overlay for name readability — fades in after this panel’s reveal, fades out on hover so image goes almost back to original brightness */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{ opacity: darkOverlayRevealed }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 bg-black/45"
          initial={false}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </motion.div>

      {/* Sweeping line — position in sync with wipe reveal; hidden when at top (not animating) */}
      {!reduceMotion && (
        <motion.div
          className="absolute left-0 right-0 z-10 h-px w-full bg-foreground/90 shadow-[0_0_8px_rgba(242,242,240,0.4)]"
          style={{ top: lineTop, opacity: lineOpacity }}
          aria-hidden
        />
      )}
    </Link>
  );
}
