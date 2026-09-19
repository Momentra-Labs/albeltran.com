"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef("");
  const posRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(0);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      posRef.current = { x: event.clientX, y: event.clientY };
      const next =
        (event.target as HTMLElement | null)
          ?.closest("[data-cursor]")
          ?.getAttribute("data-cursor") ?? "";
      if (next !== labelRef.current) {
        labelRef.current = next;
        setLabel(next);
      }
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const node = nodeRef.current;
        if (!node) return;
        const { x, y } = posRef.current;
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frameRef.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={nodeRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ transform: "translate(-100px, -100px) translate(-50%, -50%)" }}
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
