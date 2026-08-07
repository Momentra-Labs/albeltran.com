"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, User } from "lucide-react";
import { person, stats } from "@/content/person";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Software Engineer at Google via High Spring
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Al Beltran
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              I&apos;m{" "}
              <strong className="font-medium text-foreground">
                Al Andrew Paul Beltran
              </strong>
              , a Senior Software Engineer and Full-Stack Developer based in the
              Philippines.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-dim">
              I design and ship production systems with React, Next.js,
              TypeScript, JavaScript, Node.js, Java, Spring Boot, PHP, Laravel,
              PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager
              (AEM) — from APIs and event-driven backends to performance and
              technical leadership.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects/">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/about/">
                  <User className="h-4 w-4" /> About Me
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact/">
                  <Mail className="h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-dim">
              Also explore my{" "}
              <Link href="/experience/" className="text-accent hover:underline">
                experience timeline
              </Link>{" "}
              and{" "}
              <Link href="/blog/" className="text-accent hover:underline">
                engineering articles
              </Link>
              .
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-mono text-2xl font-medium text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="relative aspect-4/5">
                <Image
                  src={person.photo}
                  alt="Al Andrew Paul Beltran (Al Beltran), Senior Software Engineer, speaking on leadership"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 384px"
                  className="object-cover object-[center_20%]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/90 via-background/40 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-lg font-medium text-foreground">
                    {person.name}
                  </p>
                  <p className="text-sm text-muted">
                    {person.jobTitle} · {person.secondaryTitle}
                  </p>
                  <p className="mt-1 text-sm text-muted-dim">{person.location}</p>
                </figcaption>
              </div>
            </figure>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
