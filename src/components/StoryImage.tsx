"use client";

import Image from "next/image";
import { useState } from "react";

export function StoryImage() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src="/images/about/story.png"
      alt="Ermir Zeneli"
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw,  min(896px, 90vw)"
      onError={() => setFailed(true)}
    />
  );
}
