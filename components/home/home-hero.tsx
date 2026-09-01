"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { person } from "@/content/person";

const coverLines = [
  person.jobTitle,
  `At ${person.currentCompany} ${person.currentEmployerNote}`,
  person.founderTitle,
  person.personalProducts.join(" · "),
] as const;

function CoverLines() {
  return (
    <ol className="space-y-2">
      {coverLines.map((line, index) => (
        <li
          key={line}
          className="flex gap-3 font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-foreground/85 sm:text-[11px]"
        >
          <span className="shrink-0 text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{line}</span>
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
      <p>
        <span className="text-accent">01</span> Issue
      </p>
      <p>Vol. 01</p>
      <p>Manila / PH</p>
      <p>2026</p>
    </div>
  );
}

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="magazine-cover relative min-h-dvh bg-background lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <div
        className="pointer-events-none absolute inset-3 z-20 hidden border border-border lg:block"
        aria-hidden
      />

      <p className="sr-only">
        I turn complex problems into scalable software — from enterprise
        platforms and financial systems to products I&apos;ve built from scratch
        as founder of {person.labs}. {person.name} ({person.shortName}), based in
        the Philippines. Software Engineer at Google via High Spring.
        Products: {person.personalProducts.join(", ")}.
      </p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 grid min-h-dvh grid-rows-[auto_auto_minmax(0,1fr)_auto] lg:h-full lg:min-h-0 lg:grid-rows-[auto_minmax(0,1fr)_auto]"
      >
        <header className="flex items-start justify-between gap-6 px-5 pt-24 sm:px-8 lg:px-10">
          <p className="font-display text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.82] tracking-tight text-foreground">
            AL BELTRAN
          </p>
          <IssueLockup className="hidden shrink-0 pt-2 text-right lg:block" />
        </header>

        <div className="px-5 pt-4 sm:px-8 lg:hidden">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">Vol. 01</span> / Manila
          </p>
        </div>

        <div className="grid min-h-0 gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,42%)] lg:gap-10 lg:px-10 lg:py-0">
          <figure className="group relative flex min-h-0 flex-col lg:order-last lg:h-full">
            <div className="editorial-grain relative aspect-[4/5] max-h-[42vh] overflow-hidden border border-border lg:aspect-auto lg:h-full lg:max-h-none lg:min-h-0">
              <Image
                src={person.photo}
                alt="Al Andrew Paul Beltran (Al Beltran), Senior Software Engineer and founder of Momentra Labs"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className={`object-cover object-[center_18%] saturate-[0.92] ${
                  reduce
                    ? ""
                    : "transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                }`}
              />
            </div>
            <figcaption className="mt-3 flex shrink-0 flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span>Al Beltran / Manila</span>
              <span className="text-muted-dim">14.60° N / 120.98° E</span>
            </figcaption>
          </figure>

          <div className="flex min-h-0 flex-col justify-end pb-2 lg:pb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Cover story
            </p>
            <h1 className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,5.5vw,4.25rem)] leading-[0.9] tracking-tight text-foreground">
              I build systems, products, and experiences.
            </h1>
            <div className="mt-6 lg:mt-8">
              <CoverLines />
            </div>
          </div>
        </div>

        <footer className="relative z-10 border-t border-border/80 px-5 py-3 sm:px-8 lg:px-10 lg:py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]"
              aria-label="Cover actions"
            >
              <Link
                href="#work"
                data-cursor="VIEW"
                className="text-foreground hover:text-accent"
              >
                Explore my work
              </Link>
              <Link
                href="#contact"
                data-cursor="→"
                className="text-muted hover:text-foreground"
              >
                Let&apos;s talk
              </Link>
            </nav>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted lg:text-[11px]">
              Software Engineer at Google via High Spring · {person.labs}
            </p>
          </div>
        </footer>
      </motion.div>
    </section>
  );
}
