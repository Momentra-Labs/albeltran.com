"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

export type RevealVariant = "ink" | "folio" | "rise";

const motionFor: Record<
  RevealVariant,
  { initial: TargetAndTransition; animate: TargetAndTransition; duration: number }
> = {
  ink: {
    initial: { opacity: 0.2, clipPath: "inset(0 0 88% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    duration: 0.7,
  },
  folio: {
    initial: { opacity: 0, y: 20, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    duration: 0.55,
  },
  rise: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    duration: 0.55,
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "folio",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const preset = motionFor[variant];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: preset.duration, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  index = 0,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  variant?: RevealVariant;
}) {
  return (
    <Reveal className={className} delay={index * 0.055} variant={variant}>
      {children}
    </Reveal>
  );
}

export function SpreadRule({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={`h-px bg-border ${className ?? ""}`} />;
  }

  return (
    <motion.div
      className={`h-px origin-left bg-border ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.75, ease }}
    />
  );
}
