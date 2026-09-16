"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribeCursorMedia(onChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onChange);
  reduce.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduce.removeEventListener("change", onChange);
  };
}

function cursorEnabled() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeCursorMedia,
    cursorEnabled,
    () => false,
  );
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

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
