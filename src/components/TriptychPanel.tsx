"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion, type MotionValue } from "framer-motion";
import type { HomePanel } from "@/content/home";

const LINE_DURATION = 0.7;
const LINE_EASE = [0.22, 0.61, 0.36, 1] as const;

/** Panel reveals start after name animation + ~0.3s pause (progress 0.46+). */
const LOAD_REVEAL_RANGES: [number, number][] = [
  [0.46, 0.71],
  [0.51, 0.81],
  [0.56, 0.91],
];

type TriptychPanelProps = HomePanel & {
  grayscaleFilter?: boolean;
  fallbackSrc?: string;
  loadProgress?: MotionValue<number>;
  panelIndex?: number;
  initialRevealDirection?: "top" | "bottom";
  nameAnimationEndProgress?: number;
  unoptimizedImage?: boolean;
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
  unoptimizedImage = false,
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
  /** First panel: base zoom 1.2; center: 1; right: 1. Hover adds slight scale on top. (Center zoom-out is done via wrapper on mobile only.) */
  const baseZoom = panelIndex === 0 ? 1.2 : 1;
  const scale = useTransform(progress, [0, 1], [baseZoom, baseZoom * 1.03]);

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

  /* Only intercept mouse: first click = reveal, second = navigate. Touch/pen always navigate on first tap. */
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (progress.get() === 1) return;
      if (e.pointerType !== "mouse") return; /* touch/pen: let link navigate */
      e.preventDefault();
      triggerHoverState();
    },
    [progress, triggerHoverState]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      /* Only trigger reveal; do not preventDefault so the link navigates on first tap */
      if (progress.get() === 1) return;
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
      {/* Panel label — fades in towards end of load; centered at bottom of section */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2"
        style={{ opacity: reduceMotion ? 1 : labelOpacity }}
      >
        <motion.span
          className="block font-sans tracking-widest uppercase text-foreground/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
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
      {/* Image container: scale subtly when revealed; first panel shifted up 63px so full bottom is visible */}
      <motion.div
        className="absolute inset-0 origin-center"
        style={{ scale, y: panelIndex === 0 ? -63 : 0 }}
      >
        {/* Center panel on mobile only: larger image area scaled down to fit = zoomed-out background, still fills 100% (no edges/letterboxing) */}
        <div
          className={
            panelIndex === 1
              ? "absolute left-1/2 top-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 origin-center overflow-hidden max-md:scale-[0.833] md:scale-100 md:w-full md:h-full md:left-0 md:top-0 md:translate-x-0 md:translate-y-0"
              : "relative h-full w-full"
          }
        >
        {/* Default image — always visible underneath; first panel slightly brighter to reduce darkness; first panel anchored to bottom so bottom of image is visible */}
        <Image
          src={defaultSrc}
          alt=""
          fill
          sizes="33vw"
          className={
            panelIndex === 0
              ? "object-cover max-md:[object-position:calc(50%-20px)_bottom] md:[object-position:center_bottom]"
              : panelIndex === 2
                ? "object-cover max-md:[object-position:calc(50%+50px)_center]"
                : "object-cover"
          }
          unoptimized={unoptimizedImage}
          style={{
            filter:
              panelIndex === 0
                ? grayscaleFilter
                  ? "grayscale(1) contrast(1) brightness(1.1)"
                  : "contrast(1) brightness(1.1)"
                : grayscaleFilter
                  ? "grayscale(1) contrast(1)"
                  : "contrast(1)",
          }}
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
            className={
              panelIndex === 0
                ? "object-cover max-md:[object-position:calc(50%-20px)_bottom] md:[object-position:center_bottom]"
                : panelIndex === 2
                  ? "object-cover max-md:[object-position:calc(50%+50px)_center]"
                  : "object-cover"
            }
            unoptimized={unoptimizedImage}
            style={{
              filter: grayscaleFilter
                ? "grayscale(1) contrast(1.12) brightness(1.06)"
                : "contrast(1.12) brightness(1.06)",
            }}
            onError={() => setHoverImageError(true)}
          />
        </motion.div>
        </div>
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
          className={`absolute inset-0 ${panelIndex === 0 ? "bg-black/35" : "bg-black/45"}`}
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
