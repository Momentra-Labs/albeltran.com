"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/content/person";
import { coverMarksLine } from "@/content/marks";

const coverEase = [0.23, 1, 0.32, 1] as const;

const REST = {
  spotX: "74%",
  spotY: "36%",
  lookX: "0.74",
  lookY: "0.36",
  tiltX: "0deg",
  tiltY: "0deg",
  tiltPx: "0px",
  tiltPy: "0px",
} as const;

function applyCoverVars(
  node: HTMLElement,
  vars: {
    spotX: string;
    spotY: string;
    lookX: string;
    lookY: string;
    tiltX: string;
    tiltY: string;
    tiltPx: string;
    tiltPy: string;
  },
) {
  node.style.setProperty("--spot-x", vars.spotX);
  node.style.setProperty("--spot-y", vars.spotY);
  node.style.setProperty("--look-x", vars.lookX);
  node.style.setProperty("--look-y", vars.lookY);
  node.style.setProperty("--tilt-x", vars.tiltX);
  node.style.setProperty("--tilt-y", vars.tiltY);
  node.style.setProperty("--tilt-px", vars.tiltPx);
  node.style.setProperty("--tilt-py", vars.tiltPy);
}

function inkReveal(delay: number, reduce: boolean | null) {
  if (reduce) {
    return { initial: false as const };
  }
  return {
    initial: { opacity: 0.2, clipPath: "inset(0 0 88% 0)" },
    animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
    transition: { duration: 0.75, ease: coverEase, delay },
  };
}

function fadeOnly(delay: number, reduce: boolean | null) {
  if (reduce) {
    return { initial: false as const };
  }
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: coverEase, delay },
  };
}

const coverEntries = [
  {
    title: "Engineering lead",
    dek: `${person.currentCompany} · ${person.currentEmployerNote}`,
  },
  {
    title: "Software engineer",
    dek: "Previously Google via High Spring",
  },
  {
    title: "Founder",
    dek: person.labs,
  },
  {
    title: "Independent builder",
    dek: person.personalProducts.join(" · "),
  },
] as const;

function CoverTitle({ reduce }: { reduce: boolean | null }) {
  const text = "AL BELTRAN";
  if (reduce) {
    return <span aria-hidden>{text}</span>;
  }

  return (
    <>
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="absolute left-0 top-0 whitespace-nowrap" aria-hidden>
        {text.split("").map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%", clipPath: "inset(0 0 100% 0)" }}
              animate={{ y: "0%", clipPath: "inset(0 0 0% 0)" }}
              transition={{
                duration: 0.72,
                ease: coverEase,
                delay: index * 0.038,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  );
}

function CoverLines({ reduce }: { reduce: boolean | null }) {
  return (
    <ol className="space-y-2.5">
      {coverEntries.map((entry, index) => (
        <motion.li
          key={entry.title}
          className="flex gap-3"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: coverEase,
            delay: 0.42 + index * 0.05,
          }}
        >
          <span className="shrink-0 font-mono text-[10px] text-accent sm:text-[11px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground sm:text-[11px]">
              {entry.title}
            </span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {entry.dek}
            </span>
          </span>
        </motion.li>
      ))}
    </ol>
  );
}

const lockupLines = [
  { text: "01", className: "text-accent" },
  { text: "Issue", className: "" },
  { text: "Vol. 01", className: "mt-2" },
  { text: "Manila / PH", className: "" },
  { text: "2026", className: "" },
] as const;

function IssueLockup({
  className = "",
  reduce,
}: {
  className?: string;
  reduce: boolean | null;
}) {
  return (
    <div
      className={`font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted ${className}`}
    >
      {lockupLines.map((line, index) => (
        <motion.p
          key={line.text}
          className={line.className}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: coverEase,
            delay: 0.18 + index * 0.045,
          }}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  );
}

function CoverEpigraph() {
  return (
    <blockquote className="max-w-[22rem] border-l border-accent/50 pl-3">
      <p className="font-display text-[1.05rem] leading-snug tracking-tight text-muted italic lg:text-[1.2rem]">
        The best way to predict the future is to invent it.
      </p>
      <footer className="mt-2">
        <cite className="font-mono text-[10px] uppercase not-italic tracking-[0.22em] text-muted-dim">
          — Alan Kay
        </cite>
      </footer>
    </blockquote>
  );
}

const ctaClass =
  "rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function HomeHero() {
  const reduce = useReducedMotion();
  const coverRef = useRef<HTMLElement>(null);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType === "touch") return;
      const cover = coverRef.current;
      if (!cover) return;
      const rect = cover.getBoundingClientRect();
      const nx = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const ny = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      applyCoverVars(cover, {
        spotX: `${nx * 100}%`,
        spotY: `${ny * 100}%`,
        lookX: nx.toFixed(3),
        lookY: ny.toFixed(3),
        tiltX: `${((0.5 - ny) * 8).toFixed(2)}deg`,
        tiltY: `${((nx - 0.5) * 8).toFixed(2)}deg`,
        tiltPx: `${((nx - 0.5) * 12).toFixed(1)}px`,
        tiltPy: `${((ny - 0.5) * 12).toFixed(1)}px`,
      });
    },
    [reduce],
  );

  const onPointerOut = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType === "touch") return;
      const next = event.relatedTarget as Node | null;
      if (next && event.currentTarget.contains(next)) return;
      applyCoverVars(event.currentTarget, REST);
    },
    [reduce],
  );

  return (
    <section
      ref={coverRef}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
      className="magazine-cover relative min-h-dvh lg:h-dvh lg:max-h-dvh lg:overflow-hidden"
    >
      <div className="magazine-cover-stage" aria-hidden>
        <div className="magazine-cover-wash" />
        <div className="magazine-cover-spot" />
        <div className="magazine-cover-grid hidden lg:block" />
        {reduce ? null : <div className="magazine-cover-grain" />}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-3 z-20 hidden border border-border lg:block"
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: coverEase, delay: 0.45 }}
      >
        <span className="magazine-crop magazine-crop-tl" />
        <span className="magazine-crop magazine-crop-tr" />
        <span className="magazine-crop magazine-crop-bl" />
        <span className="magazine-crop magazine-crop-br" />
      </motion.div>

      <p className="sr-only">
        {person.legalName} ({person.shortName}) is a {person.occupation} in
        Manila. {person.currentRole}. Founder of {person.labs}. Previously
        Software Engineer at Google via High Spring. Independent products:{" "}
        {person.personalProducts.join(", ")}. National Geographic and Disney via
        Myridius. Maya fintech.
      </p>

      <div className="relative z-10 grid min-h-dvh grid-rows-[auto_auto_auto_auto] lg:h-full lg:min-h-0 lg:max-h-full lg:overflow-hidden lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <header className="flex items-start justify-between gap-6 px-5 pt-20 sm:px-8 lg:px-10">
          <h1
            className="relative font-display text-[clamp(2.4rem,8vw,7.2rem)] leading-[0.82] tracking-tight text-foreground"
            aria-label="AL BELTRAN"
          >
            <CoverTitle reduce={reduce} />
          </h1>
          <IssueLockup
            reduce={reduce}
            className="hidden shrink-0 pt-1 text-right lg:block"
          />
        </header>

        <motion.div
          className="px-5 pt-3 sm:px-8 lg:hidden"
          {...fadeOnly(0.12, reduce)}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">Vol. 01</span> / Manila
          </p>
        </motion.div>

        <div className="grid min-h-0 gap-8 px-5 py-6 sm:px-8 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(20rem,48%)] lg:gap-6 lg:px-10 lg:py-0">
          <figure className="magazine-plate group relative order-2 flex min-h-0 origin-top flex-col lg:order-last lg:h-full lg:min-h-0 lg:self-stretch">
            <div
              className={`flex min-h-0 flex-1 flex-col ${reduce ? "" : "magazine-plate-enter"}`}
            >
            <div className="magazine-plate-print relative min-h-0 lg:flex-1">
              <span className="magazine-plate-back" aria-hidden />
              <p className="magazine-plate-spine hidden lg:block">
                Cover portrait · 01
              </p>
              <div className="magazine-portrait magazine-scan relative aspect-[3/4] max-h-[62vh] overflow-hidden lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-0">
                <Image
                  src={person.photo}
                  alt={person.imageAlt}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className={`magazine-portrait-img object-cover object-top ${
                    reduce
                      ? ""
                      : "transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  }`}
                />
                {reduce ? null : (
                  <span className="magazine-cover-scan" aria-hidden />
                )}
                <span className="magazine-portrait-glow" aria-hidden />
                <span className="magazine-portrait-fade" aria-hidden />
                <span className="magazine-portrait-meta" aria-hidden>
                  <span>Plate 01</span>
                  <span>Vol. 01</span>
                </span>
                <span className="magazine-register-mark hidden lg:block" aria-hidden />
                <span className="magazine-crop magazine-crop-tl left-4 top-4 z-[4] hidden lg:block" />
                <span className="magazine-crop magazine-crop-tr right-4 top-4 z-[4] hidden lg:block" />
              </div>
            </div>
            <figcaption className="magazine-plate-caption mt-3">
              <span>
                <span className="text-accent">Cover</span>
                <span className="text-muted-dim"> / Al Beltran</span>
              </span>
              <span className="text-muted-dim">Manila · 14.60° N / 120.98° E</span>
            </figcaption>
            </div>
          </figure>

          <div className="order-1 flex min-h-0 flex-col justify-end gap-6 pb-2 lg:justify-between lg:gap-8 lg:pt-2 lg:pb-6">
            <motion.div {...inkReveal(0.12, reduce)}>
              <CoverEpigraph />
            </motion.div>
            <div>
              <motion.div {...inkReveal(0.2, reduce)}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Cover story
                </p>
                <p className="mt-3 max-w-[12em] font-display text-[clamp(1.7rem,4.2vw,3.15rem)] leading-[0.94] tracking-tight text-foreground">
                  I design, build, and ship digital products from idea to
                  production.
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px]">
                  {person.currentRole} · {person.founderTitle}
                </p>
              </motion.div>
              <div className="mt-4 hidden lg:block">
                <CoverLines reduce={reduce} />
              </div>
            </div>
          </div>
        </div>

        <motion.footer
          className="relative z-10 mt-auto border-t border-border/80 px-5 py-3 sm:px-8 lg:mt-0 lg:px-10 lg:py-3"
          {...fadeOnly(0.5, reduce)}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]"
              aria-label="Cover actions"
            >
              <Link
                href="/about/"
                data-cursor="VIEW"
                className={`${ctaClass} text-foreground hover:text-accent`}
              >
                About Al Beltran →
              </Link>
              <Link
                href="#record"
                data-cursor="VIEW"
                className={`${ctaClass} text-muted hover:text-foreground`}
              >
                The record →
              </Link>
              <Link
                href="#work"
                data-cursor="VIEW"
                className={`${ctaClass} text-muted hover:text-foreground`}
              >
                Explore my work →
              </Link>
              <Link
                href="#contact"
                data-cursor="→"
                className={`${ctaClass} text-muted hover:text-foreground`}
              >
                Let&apos;s talk ↗
              </Link>
            </nav>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted lg:text-[11px]">
              {coverMarksLine}
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
