"use client";

import { useEffect } from "react";

export function HomePageClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHeight = document.body.style.height;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevPosition = document.body.style.position;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";

    const setVh = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.height = prevHeight;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.position = prevPosition;
      document.body.style.touchAction = prevTouchAction;
      document.body.style.width = "";
      window.removeEventListener("resize", setVh);
      document.documentElement.style.removeProperty("--app-vh");
    };
  }, []);

  return <>{children}</>;
}
