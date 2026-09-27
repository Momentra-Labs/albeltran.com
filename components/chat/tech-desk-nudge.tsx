"use client";

import { useCallback, useEffect, useState } from "react";
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

function bootReady() {
  const root = document.documentElement;
  return (
    root.classList.contains("boot-done") ||
    root.classList.contains("boot-reduce")
  );
}

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

type Bubble = { mode: "greet" | "nudge"; text: string };

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
  const [bubble, setBubble] = useState<Bubble | null>(null);
  const [deskOpened, setDeskOpened] = useState(false);
  const home = isHomePath(pathname);

  if (open && !deskOpened) {
    setDeskOpened(true);
  }

  const dismiss = useCallback(() => {
    markNudged();
    setBubble(null);
  }, []);

  useEffect(() => {
    if (open || busy || alreadyNudged()) return;

    if (!home) {
      const wait = window.setTimeout(() => {
        if (alreadyNudged()) return;
        setBubble({ mode: "nudge", text: deskNudgeForPath(pathname) });
        markNudged();
      }, 14000);
      return () => window.clearTimeout(wait);
    }

    let showTimer = 0;
    let observer: MutationObserver | null = null;

    const reveal = () => {
      if (alreadyNudged()) return;
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(
        () => {
          if (alreadyNudged()) return;
          setBubble({ mode: "greet", text: TECH_DESK.nudgeGreet });
          markNudged();
        },
        reduce ? 0 : 280,
      );
    };

    if (bootReady()) {
      reveal();
      return () => window.clearTimeout(showTimer);
    }

    observer = new MutationObserver(() => {
      if (!bootReady()) return;
      observer?.disconnect();
      reveal();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const fallback = window.setTimeout(reveal, 6800);

    return () => {
      observer?.disconnect();
      window.clearTimeout(showTimer);
      window.clearTimeout(fallback);
    };
  }, [open, busy, pathname, home, reduce]);

  const matchesRoute =
    bubble &&
    ((bubble.mode === "greet" && home) || (bubble.mode === "nudge" && !home));
  const shown = Boolean(matchesRoute) && !open && !deskOpened;

  return (
    <AnimatePresence>
      {shown && bubble ? (
        <motion.aside
          className={
            bubble.mode === "greet"
              ? "tech-desk-nudge is-greet"
              : "tech-desk-nudge"
          }
          aria-label={
            bubble.mode === "greet" ? "Tech desk greeting" : "Tech desk tip"
          }
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 4 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: deskEase }}
        >
          {bubble.mode === "greet" ? (
            <button
              type="button"
              className="tech-desk-nudge-copy"
              onClick={dismiss}
            >
              <span className="tech-desk-nudge-kicker">
                {TECH_DESK.nudgeKicker}
              </span>
              <span className="tech-desk-nudge-line">{bubble.text}</span>
            </button>
          ) : (
            <button
              type="button"
              className="tech-desk-nudge-line"
              onClick={onOpen}
            >
              {bubble.text}
            </button>
          )}
          <button
            type="button"
            className="tech-desk-nudge-x"
            aria-label={TECH_DESK.nudgeDismiss}
            onClick={dismiss}
          >
            ×
          </button>
        </motion.aside>
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
