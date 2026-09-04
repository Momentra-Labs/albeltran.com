"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/content/person";
import { coverMarksLine } from "@/content/marks";

const coverEase = [0.23, 1, 0.32, 1] as const;

function coverFade(delay: number, reduce: boolean | null) {
  if (reduce) {
    return { initial: false as const };
  }
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
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

function CoverLines() {
  return (
    <ol className="space-y-2.5">
      {coverEntries.map((entry, index) => (
        <li key={entry.title} className="flex gap-3">
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
        </li>
      ))}
    </ol>
  );
}

function IssueLockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted ${className}`}
    >
      <p className="text-accent">01</p>
      <p>Issue</p>
      <p className="mt-2">Vol. 01</p>
      <p>Manila / PH</p>
      <p>2026</p>
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
  const spotRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduce || event.pointerType === "touch") return;
      const cover = coverRef.current;
      const spot = spotRef.current;
      if (!cover || !spot) return;
      const rect = cover.getBoundingClientRect();
      spot.style.setProperty(
        "--spot-x",
        `${((event.clientX - rect.left) / rect.width) * 100}%`,
      );
      spot.style.setProperty(
        "--spot-y",
        `${((event.clientY - rect.top) / rect.height) * 100}%`,
      );
    },
    [reduce],
  );

  return (
    <section
      ref={coverRef}
      onPointerMove={onPointerMove}
      className="magazine-cover relative min-h-dvh lg:h-dvh lg:max-h-dvh lg:overflow-hidden"
    >
      <div className="magazine-cover-stage" aria-hidden>
        <div className="magazine-cover-wash" />
        <div ref={spotRef} className="magazine-cover-spot" />
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
        <motion.header
          className="flex items-start justify-between gap-6 px-5 pt-20 sm:px-8 lg:px-10"
          {...coverFade(0, reduce)}
        >
          <h1 className="font-display text-[clamp(2.4rem,8vw,7.2rem)] leading-[0.82] tracking-tight text-foreground">
            AL BELTRAN
          </h1>
          <IssueLockup className="hidden shrink-0 pt-1 text-right lg:block" />
        </motion.header>

        <motion.div
          className="px-5 pt-3 sm:px-8 lg:hidden"
          {...coverFade(0.04, reduce)}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">Vol. 01</span> / Manila
          </p>
        </motion.div>

        <div className="grid min-h-0 gap-8 px-5 py-6 sm:px-8 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(20rem,48%)] lg:gap-6 lg:px-10 lg:py-0">
          <motion.figure
            className="magazine-plate group relative order-2 flex min-h-0 origin-top flex-col lg:order-last lg:h-full lg:min-h-0 lg:self-stretch"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: coverEase, delay: 0.28 }}
          >
            <div className="magazine-plate-print relative min-h-0 lg:flex-1">
              <span className="magazine-plate-back" aria-hidden />
              <p className="magazine-plate-spine hidden lg:block">
                Cover portrait · 01
              </p>
              <div className="magazine-portrait relative aspect-[3/4] max-h-[62vh] overflow-hidden lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-0">
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
          </motion.figure>

          <div className="order-1 flex min-h-0 flex-col justify-end gap-6 pb-2 lg:justify-between lg:gap-8 lg:pt-2 lg:pb-6">
            <motion.div {...coverFade(0.12, reduce)}>
              <CoverEpigraph />
            </motion.div>
            <motion.div {...coverFade(0.2, reduce)}>
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
              <div className="mt-4 hidden lg:block">
                <CoverLines />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.footer
          className="relative z-10 mt-auto border-t border-border/80 px-5 py-3 sm:px-8 lg:mt-0 lg:px-10 lg:py-3"
          {...coverFade(0.36, reduce)}
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
