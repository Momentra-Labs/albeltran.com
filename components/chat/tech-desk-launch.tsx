"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  TechDeskMark,
  type DeskMood,
} from "@/components/chat/tech-desk-mark";
import { TECH_DESK } from "@/content/chat";
import { cn } from "@/lib/utils";

const deskEase = [0.23, 1, 0.32, 1] as const;

export function TechDeskLaunch({
  mood = "idle",
  ping = false,
  onClick,
  onHover,
}: {
  mood?: DeskMood;
  ping?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      className={cn("tech-desk-launch", ping && "has-ping")}
      aria-label={TECH_DESK.launcher}
      aria-expanded={false}
      aria-haspopup="dialog"
      data-cursor="ASK"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 8 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ duration: reduce ? 0 : 0.28, ease: deskEase }}
      onClick={onClick}
      onPointerEnter={onHover}
      onFocus={onHover}
    >
      <motion.span className="tech-desk-launch-mark" layoutId="desk-mascot" layout>
        <TechDeskMark mood={mood} />
      </motion.span>
      {ping ? (
        <span className="tech-desk-launch-pip" aria-hidden="true" />
      ) : null}
    </motion.button>
  );
}
