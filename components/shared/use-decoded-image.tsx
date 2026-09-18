"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type DecodedImageStatus = "pending" | "ready" | "missing";

export function useDecodedImage(src: string | undefined, enabled = Boolean(src)) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!enabled || !src) {
      setFailed(true);
      setLoaded(false);
      return;
    }

    let cancelled = false;
    const id = window.setInterval(() => {
      if (cancelled) return;
      const img = boxRef.current?.querySelector("img");
      if (img && img.naturalWidth > 0) {
        setLoaded(true);
        setFailed(false);
        window.clearInterval(id);
      }
    }, 50);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [enabled, src]);

  const status: DecodedImageStatus = !enabled
    ? "missing"
    : failed
      ? "missing"
      : loaded
        ? "ready"
        : "pending";

  return {
    status,
    failed,
    loaded,
    boxRef,
    onLoad: () => {
      setLoaded(true);
      setFailed(false);
    },
    onError: () => {
      setFailed(true);
      setLoaded(false);
    },
  };
}

export function DeviceShotPending({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("device-shot-pending", className)}>
      <span className="device-shot-pending-wash" />
    </div>
  );
}
