"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  certifications,
  type Certification,
  type CertificationSeal,
} from "@/content/certifications";
import { cn } from "@/lib/utils";

function SealMark({ seal }: { seal: CertificationSeal }) {
  if (seal === "hackerrank") {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          fill="currentColor"
          d="M16.4 12.6h4.2v9.2h6.8v-9.2h4.2v22.8h-4.2v-9.6h-6.8v9.6h-4.2z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        fill="currentColor"
        d="m24 8 2.4 10.6L37 21l-10.6 2.4L24 34l-2.4-10.6L11 21l10.6-2.4z"
      />
    </svg>
  );
}

function CertificatePlate({
  cert,
  index,
  total,
  compact = false,
}: {
  cert: Certification;
  index: number;
  total: number;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "cert-plate relative flex h-full min-h-0 flex-col overflow-hidden bg-surface-2",
        compact ? "p-4" : "p-5 sm:p-7",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(79,142,255,0.2),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_120%,rgba(226,210,186,0.08),transparent_46%)]" />
      <div className="cert-plate-stock" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(240,240,245,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="magazine-crop magazine-crop-tl left-3 top-3" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3" />
      <div className="relative flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {cert.issuer}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
      <div className="relative mt-5">
        <div className="text-accent">
          <SealMark seal={cert.seal} />
        </div>
        {compact ? (
          <p className="mt-3 line-clamp-4 font-display text-xl leading-[0.95] tracking-tight text-foreground">
            {cert.name}
          </p>
        ) : (
          <>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Certificate
            </p>
            <p className="mt-2 font-display text-[1.7rem] leading-[0.94] tracking-tight text-foreground sm:text-[2.05rem]">
              {cert.name}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Issued {cert.issued}
            </p>
            <span className="mt-5 inline-flex font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Verify →
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function CertificationsSlider({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = certifications.length;
  const current = certifications[index];
  const next = certifications[(index + 1) % count];

  const go = useCallback(
    (nextIndex: number) => {
      if (count === 0) return;
      setIndex((nextIndex + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % count);
    }, 5000);
    return () => window.clearInterval(id);
  }, [count, paused, reduce]);

  if (!current || !next) return null;

  return (
    <div
      className={cn("cert-slider cert-showcase min-w-0", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Licenses and certifications"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget;
        if (!(nextFocus instanceof Node) || !event.currentTarget.contains(nextFocus)) {
          setPaused(false);
        }
      }}
    >
      <div className="cert-showcase-wash" aria-hidden />
      <div className="cert-showcase-grid" aria-hidden />
      <div className="cert-showcase-grain" aria-hidden />
      <div className="cert-showcase-vignette" aria-hidden />
      <p className="cert-showcase-folio" aria-hidden>
        06
      </p>
      <span className="magazine-crop magazine-crop-tl left-3 top-3 z-[1]" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3 z-[1]" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3 z-[1]" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3 z-[1]" />
      <p className="relative z-[1] mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dim">
        Press bed / issuer plates
      </p>
      <p className="sr-only" aria-live="polite">
        {current.name}, {current.issuer}
      </p>
      <div className="relative z-[1] grid items-stretch gap-3 md:grid-cols-[minmax(0,1fr)_10rem]">
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW"
          className="cert-slider-frame relative block h-[19.5rem] overflow-hidden border border-border sm:h-[21rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, x: -18 }}
              transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
            >
              <CertificatePlate cert={current} index={index} total={count} />
            </motion.div>
          </AnimatePresence>
        </a>
        <button
          type="button"
          aria-label={`Next certificate: ${next.name}`}
          className="cert-slider-peek relative hidden h-[19.5rem] overflow-hidden border border-border text-left sm:h-[21rem] md:block"
          onClick={() => go(index + 1)}
        >
          <CertificatePlate
            cert={next}
            index={(index + 1) % count}
            total={count}
            compact
          />
        </button>
      </div>
      <div className="relative z-[1] mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous certificate"
            className="flex h-8 w-8 items-center justify-center border border-border font-mono text-sm text-foreground hover:border-border-bright"
            onClick={() => go(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next certificate"
            className="flex h-8 w-8 items-center justify-center border border-border font-mono text-sm text-foreground hover:border-border-bright"
            onClick={() => go(index + 1)}
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {certifications.map((cert, certIndex) => (
            <button
              key={cert.id}
              type="button"
              aria-label={`Show ${cert.name}`}
              aria-current={certIndex === index}
              className={cn(
                "h-1 rounded-full transition-all",
                certIndex === index
                  ? "w-4 bg-accent"
                  : "w-1.5 bg-muted-dim hover:bg-muted",
              )}
              onClick={() => go(certIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
