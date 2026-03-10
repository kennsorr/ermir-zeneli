"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { TriptychPanel } from "./TriptychPanel";
import { homePanels } from "@/content/home";

const LOAD_DURATION = 5;
/** Name fades in over progress 0 → 0.55 (~2.75s) — longer range so the ease-out is very gradual. */
const NAME_PROGRESS_END = 0.55;

export function TriptychHero() {
  const reduceMotion = useReducedMotion();
  const loadProgress = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) {
      loadProgress.set(1);
      return;
    }
    const controls = animate(loadProgress, 1, {
      duration: LOAD_DURATION,
      ease: [0.22, 0.61, 0.36, 1],
    });
    return controls.stop;
  }, [loadProgress, reduceMotion]);

  const nameOpacity = useTransform(loadProgress, (v) => {
    const t = Math.min(1, v / NAME_PROGRESS_END);
    // Smooth ease-in-out: slow start, accelerates, then decelerates so gently
    // the moment it reaches full opacity is imperceptible.
    const ease = t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
    return ease;
  });
  const nameScale = useTransform(loadProgress, (v) => {
    const t = Math.min(1, v / NAME_PROGRESS_END);
    const ease = t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
    return 0.88 + 0.12 * ease;
  });
  /** Black layer over the text fades out — uses same extended range and gentle ease-out */
  const darkVeilOpacity = useTransform(loadProgress, (v) => {
    const t = Math.min(1, v / NAME_PROGRESS_END);
    const ease = t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
    return 1 - ease;
  });

  return (
    <section
      className="relative grid h-screen w-full grid-cols-3 bg-black"
      aria-label="Home hero — Portfolio, Story, Contact"
    >
      {homePanels.map((panel, index) => (
        <TriptychPanel
          key={panel.id}
          {...panel}
          loadProgress={loadProgress}
          panelIndex={index}
          initialRevealDirection={index === 1 ? "bottom" : "top"}
          nameAnimationEndProgress={NAME_PROGRESS_END}
        />
      ))}

      {/* Bottom gradient: black to transparent over ~25px so panel labels stay readable */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[50px] bg-gradient-to-t from-black to-transparent"
        aria-hidden
      />

      {/* Name: first thing on screen — fades in from dark (ease-in), grows to full size; black veil fades out to reveal */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
        style={{
          opacity: nameOpacity,
          scale: nameScale,
        }}
        aria-hidden
      >
        <span className="relative flex flex-col text-center font-display font-normal uppercase tracking-[0.12em] text-[clamp(2rem,14vw,4rem)] md:flex-row md:whitespace-nowrap md:text-[clamp(2.5rem,10vw,8rem)]">
          <span className="flex flex-col text-center text-foreground/95 md:flex-row [text-shadow:0_1px_3px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.25)]">
            <span>Ermir</span>
            <span className="md:ml-[0.12em]">Zeneli</span>
          </span>
          <motion.span
            className="absolute inset-0 flex flex-col items-center justify-center text-center font-display font-normal uppercase tracking-[0.12em] text-black md:flex-row md:whitespace-nowrap [font-size:inherit]"
            style={{ opacity: darkVeilOpacity }}
            aria-hidden
          >
            <span className="md:inline">Ermir</span>
            <span className="md:ml-[0.12em] md:inline">Zeneli</span>
          </motion.span>
        </span>
      </motion.div>
    </section>
  );
}
