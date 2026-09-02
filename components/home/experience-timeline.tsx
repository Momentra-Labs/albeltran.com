"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ExperienceItem } from "@/content/experience";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Reveal, SpreadRule } from "@/components/shared/reveal";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.25"],
  });
  const scan = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="magazine-spread py-16 sm:py-20">
      <Container>
        <Reveal className="mb-4 flex items-end justify-between gap-4" variant="folio">
          <div>
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Experience
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              A path from shipping features to owning systems
            </h2>
          </div>
          <Link
            href="/experience/"
            className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground sm:inline"
            data-cursor="→"
          >
            Full timeline
          </Link>
        </Reveal>
        <SpreadRule className="mb-10" />
        <ol ref={listRef} className="relative space-y-5 pl-6 sm:pl-8">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px bg-border sm:left-0"
          />
          {reduce ? null : (
            <motion.span
              aria-hidden
              className="absolute top-0 left-0 h-full w-px origin-top bg-accent"
              style={{ scaleY: scan }}
            />
          )}
          {items.map((item, index) => {
            const folio = String(index + 1).padStart(2, "0");
            return (
              <motion.li
                key={item.id}
                className="relative scroll-mt-24"
                id={item.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <article className="border border-border bg-background/40 p-5 transition-colors hover:border-border-bright sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {folio} / {item.company}
                    </p>
                    <p className="font-mono text-[11px] text-muted-dim">
                      {item.duration}
                    </p>
                  </div>
                  <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground">
                    {item.role}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                  <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-4 text-sm text-muted">
                    {item.responsibilities.slice(0, 3).map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.technologies.slice(0, 6).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
