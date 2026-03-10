"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

const TILT_MAX = 18;
const PUSH_EXTRA = 8;
const SPRING_TRACK = { stiffness: 600, damping: 30 };
const SPRING_RETURN = { stiffness: 100, damping: 14 };

function isTouchDevice() {
  return typeof window !== "undefined" && "ontouchstart" in window;
}

export function StoryImage() {
  const [failed, setFailed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const lastNx = useRef(0.5);
  const lastNy = useRef(0.5);
  const isClickTilted = useRef(false);

  const hoverRotateX = useSpring(0, SPRING_TRACK);
  const hoverRotateY = useSpring(0, SPRING_TRACK);

  const scrollTiltX = useSpring(0, SPRING_RETURN);
  const introRotateX = useSpring(0, SPRING_RETURN);
  const introRotateY = useSpring(0, SPRING_RETURN);

  const combinedRotateX = useTransform(
    [hoverRotateX, scrollTiltX, introRotateX],
    ([hx, sx, ix]: number[]) => hx + ix + sx
  );
  const combinedRotateY = useTransform(
    [hoverRotateY, introRotateY],
    ([hy, iy]: number[]) => hy + iy
  );

  const dynamicShadow = useTransform(
    [combinedRotateX, combinedRotateY],
    ([rx, ry]: number[]) => {
      const offX = -ry * 1.2;
      const offY = rx * 1.2 + 12;
      const blur = 35 + Math.abs(rx) + Math.abs(ry);
      return `${offX}px ${offY}px ${blur}px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.25)`;
    }
  );

  const tiltTo = useCallback((nx: number, ny: number) => {
    hoverRotateX.set((0.5 - ny) * TILT_MAX * 2);
    hoverRotateY.set((nx - 0.5) * TILT_MAX * 2);
  }, [hoverRotateX, hoverRotateY]);

  const returnToCenter = useCallback(() => {
    animate(hoverRotateX, 0, { type: "spring", ...SPRING_RETURN });
    animate(hoverRotateY, 0, { type: "spring", ...SPRING_RETURN });
  }, [hoverRotateX, hoverRotateY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isClickTilted.current) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    lastNx.current = nx;
    lastNy.current = ny;
    tiltTo(nx, ny);
  }, [tiltTo]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (isClickTilted.current) {
      isClickTilted.current = false;
    }
    returnToCenter();
  }, [returnToCenter]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice()) return;

    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    if (isClickTilted.current) {
      isClickTilted.current = false;
      tiltTo(nx, ny);
      return;
    }

    isClickTilted.current = true;
    const pushX = (0.5 - ny) * (TILT_MAX + PUSH_EXTRA) * 2;
    const pushY = (nx - 0.5) * (TILT_MAX + PUSH_EXTRA) * 2;
    hoverRotateX.set(pushX);
    hoverRotateY.set(pushY);
  }, [hoverRotateX, hoverRotateY, tiltTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const touch = e.touches[0];
    const rect = el.getBoundingClientRect();
    const nx = (touch.clientX - rect.left) / rect.width;
    const ny = (touch.clientY - rect.top) / rect.height;

    const pushX = (0.5 - ny) * (TILT_MAX + PUSH_EXTRA) * 2;
    const pushY = (nx - 0.5) * (TILT_MAX + PUSH_EXTRA) * 2;
    animate(hoverRotateX, pushX, { type: "spring", ...SPRING_TRACK });
    animate(hoverRotateY, pushY, { type: "spring", ...SPRING_TRACK });

    setTimeout(() => {
      returnToCenter();
    }, 400);
  }, [hoverRotateX, hoverRotateY, returnToCenter]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isClickTilted.current) return;
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        isClickTilted.current = false;
        returnToCenter();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [returnToCenter]);

  useEffect(() => {
    introRotateX.jump(-8);
    introRotateY.jump(6);

    const timeout = setTimeout(() => {
      animate(introRotateX, 0, { type: "spring", ...SPRING_RETURN });
      animate(introRotateY, 0, { type: "spring", ...SPRING_RETURN });
    }, 500);

    return () => clearTimeout(timeout);
  }, [introRotateX, introRotateY]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTouchY: number | null = null;
    let rafId: number;
    let idleTimeout: ReturnType<typeof setTimeout>;

    const applyScrollTilt = (delta: number) => {
      if (isHovering.current) return;
      const tilt = Math.max(-18, Math.min(18, delta * 1.2));
      scrollTiltX.set(tilt);

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (atBottom) {
        animate(scrollTiltX, -6, { type: "spring", ...SPRING_TRACK });
        setTimeout(() => {
          animate(scrollTiltX, 0, { type: "spring", ...SPRING_RETURN });
        }, 250);
      }
    };

    const scheduleIdle = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (!isHovering.current) {
          animate(scrollTiltX, 0, { type: "spring", ...SPRING_RETURN });
        }
      }, 150);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        applyScrollTilt(delta);
      });
      scheduleIdle();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (lastTouchY !== null) {
        const delta = lastTouchY - touchY;
        applyScrollTilt(delta);
        scheduleIdle();
      }
      lastTouchY = touchY;
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
      scheduleIdle();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimeout);
    };
  }, [scrollTiltX]);

  if (failed) return null;

  return (
    <motion.figure
      ref={cardRef}
      className="relative aspect-[3/4] w-full cursor-pointer rounded-[10px]"
      style={{
        transformStyle: "preserve-3d",
        rotateX: combinedRotateX,
        rotateY: combinedRotateY,
        boxShadow: dynamicShadow,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Image
        src="/images/about/story.png"
        alt="Ermir Zeneli"
        fill
        className="rounded-[10px] object-contain"
        sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
        draggable={false}
        onError={() => setFailed(true)}
      />
    </motion.figure>
  );
}
