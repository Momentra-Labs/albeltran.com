"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { person, stats } from "@/content/person";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Senior Software Engineer
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl sm:leading-[1.05]">
              I build systems, products, and experiences.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I turn complex problems into scalable software — from enterprise
              platforms and financial systems to products I&apos;ve built from
              scratch as founder of {person.labs}. {person.name} (
              {person.shortName}), based in the Philippines.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="#work" data-cursor="VIEW">
                  Explore my work
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact" data-cursor="→">
                  Let&apos;s talk
                </Link>
              </Button>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Software Engineer at Google via High Spring · {person.founderTitle}{" "}
              ({person.personalProducts.join(", ")})
            </p>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-mono text-xl text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-4/5 overflow-hidden border border-border">
              <Image
                src={person.photo}
                alt="Al Andrew Paul Beltran (Al Beltran), Senior Software Engineer and founder of Momentra Labs"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 380px"
                className="object-cover object-[center_18%]"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[11px] tracking-wide text-muted-dim">
              {person.shortName} · {person.founderTitle}
            </figcaption>
          </figure>
        </motion.div>
      </Container>
    </section>
  );
}
