"use client";

import { useEffect } from "react";
import { BOOT_STORAGE_KEY } from "@/lib/boot";

/** Tells the first-paint boot engine that React has mounted. */
export function PortfolioBootHydrate() {
  useEffect(() => {
    const html = document.documentElement;
    try {
      if (sessionStorage.getItem(BOOT_STORAGE_KEY) === "1") {
        html.classList.add("boot-done");
        html.classList.remove("boot-pending", "boot-leaving");
      }
    } catch {
      /* private mode */
    }
    window.__alBoot?.hydrate();
    const skip = document.getElementById("boot-skip");
    const onSkip = () => window.__alBoot?.skip();
    skip?.addEventListener("click", onSkip);
    return () => skip?.removeEventListener("click", onSkip);
  }, []);

  return null;
}
