"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const ISSUE_SPREADS = [
  { id: "record", label: "Record", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "playground", label: "Play", index: "04" },
  { id: "lab", label: "Lab", index: "05" },
  { id: "system", label: "Stack", index: "06" },
  { id: "experience", label: "Experience", index: "07" },
  { id: "notes", label: "Notes", index: "08" },
  { id: "contact", label: "Contact", index: "09" },
] as const;

export function IssueFolio() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof ISSUE_SPREADS)[number] | null>(
    null,
  );

  useEffect(() => {
    if (reduce) return;
    let frame = 0;

    const update = () => {
      const mark = window.innerHeight * 0.36;
      const cover = document.querySelector(".magazine-cover");
      if (cover) {
        const coverRect = cover.getBoundingClientRect();
        if (coverRect.top <= mark && coverRect.bottom > mark) {
          setActive(null);
          return;
        }
      }

      let current: (typeof ISSUE_SPREADS)[number] | null = null;
      for (const item of ISSUE_SPREADS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mark && rect.bottom > mark) {
          current = item;
          break;
        }
      }
      setActive((prev) => {
        if (!current) return null;
        return prev?.id === current.id ? prev : current;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  if (reduce || !active) return null;

  return (
    <p
      aria-hidden
      className="pointer-events-none fixed top-[42%] left-4 z-30 hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-dim xl:block"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      <span className="text-accent">{active.index}</span>
      <span className="mx-2 text-border-bright">/</span>
      <span>{active.label}</span>
      <span className="mt-3 block tracking-[0.22em] text-muted-dim/80">
        Vol. 01
      </span>
    </p>
  );
}
