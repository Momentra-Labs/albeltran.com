"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { TECH_DESK, deskNudgeForPath } from "@/content/chat";

const SEEN_KEY = "albeltran-desk-nudge";
const deskEase = [0.23, 1, 0.32, 1] as const;

function alreadyNudged() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true;
  }
}

function markNudged() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // private mode
  }
}

export function TechDeskNudge({
  open,
  busy,
  onOpen,
}: {
  open: boolean;
  busy: boolean;
  onOpen: () => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    if (open || busy || alreadyNudged()) return;
    const wait = window.setTimeout(() => {
      if (alreadyNudged()) return;
      setLine(deskNudgeForPath(pathname));
      markNudged();
    }, 14000);
    return () => window.clearTimeout(wait);
  }, [open, busy, pathname]);

  useEffect(() => {
    if (open) setLine(null);
  }, [open]);

  return (
    <AnimatePresence>
      {line && !open ? (
        <motion.div
          className="tech-desk-nudge"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 4 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: deskEase }}
        >
          <button
            type="button"
            className="tech-desk-nudge-line"
            onClick={onOpen}
          >
            {line}
          </button>
          <button
            type="button"
            className="tech-desk-nudge-x"
            aria-label={TECH_DESK.nudgeDismiss}
            onClick={() => setLine(null)}
          >
            ×
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function markDeskOpened() {
  try {
    window.sessionStorage.setItem("albeltran-desk-opened", "1");
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // private mode
  }
}

export function deskUnseen() {
  try {
    return window.sessionStorage.getItem("albeltran-desk-opened") !== "1";
  } catch {
    return false;
  }
}
