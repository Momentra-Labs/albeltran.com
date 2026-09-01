"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement | null)?.closest(
        "[data-cursor]",
      );
      setLabel(target?.getAttribute("data-cursor") ?? "");
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] mix-blend-difference"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div
        className={cn(
          "flex h-2 w-2 items-center justify-center rounded-full bg-white transition-all duration-150",
          label && "h-9 w-auto min-w-9 rounded-full px-2.5",
        )}
      >
        {label ? (
          <span className="font-mono text-[10px] font-medium tracking-wide text-black">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
