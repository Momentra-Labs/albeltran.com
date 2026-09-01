"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ExperienceItem } from "@/content/experience";
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  const reduce = useReducedMotion();
  const visible = items;

  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Experience
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
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
        </div>
        <ol className="relative border-l border-border pl-6 sm:pl-8">
          {visible.map((item, index) => (
            <motion.li
              key={item.id}
              className="relative pb-12 last:pb-0"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <span className="absolute -left-[1.91rem] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-background sm:-left-[2.16rem]" />
              <p className="font-mono text-[11px] text-accent">{item.duration}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted">{item.company}</p>
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
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
