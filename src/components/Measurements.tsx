"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const measurements = [
  { label: "Age", value: "26" },
  { label: "Height", value: "189cm" },
  { label: "Weight", value: "88kg" },
  { label: "Bust", value: "107cm" },
  { label: "Waist", value: "85cm" },
  { label: "Hips", value: "100cm" },
  { label: "Inseam", value: "87cm" },
  { label: "Hair Color", value: "Dark Brown" },
  { label: "Eye Color", value: "Blue" },
  { label: "Shoes", value: "42 (EU)" },
] as const;

export function Measurements() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 font-sans">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group flex w-full cursor-pointer items-center justify-between text-left text-sm font-semibold tracking-widest uppercase transition-colors duration-300 md:text-base ${
          open ? "text-foreground/70 hover:text-foreground/90" : "text-foreground/50 hover:text-foreground/70"
        }`}
      >
        <span>{open ? "Hide measurements" : "See measurements"}</span>
        <motion.span
          className="inline-block text-xs"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        >
          ▾
        </motion.span>
      </button>

      <div className="mt-2 h-px w-full bg-foreground/25" />

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="flex gap-x-6 pt-5 pb-2 text-sm md:text-base">
              <dl className="flex flex-1 flex-col gap-y-3">
                {measurements.filter((_, i) => i % 2 === 0).map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between">
                    <dt className="text-foreground-muted">{label}</dt>
                    <dd className="font-medium text-foreground/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="w-px bg-foreground/15" />
              <dl className="flex flex-1 flex-col gap-y-3">
                {measurements.filter((_, i) => i % 2 === 1).map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between">
                    <dt className="text-foreground-muted">{label}</dt>
                    <dd className="font-medium text-foreground/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
