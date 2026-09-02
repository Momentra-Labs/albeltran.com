import Link from "next/link";
import type { Project } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { ProjectCover } from "@/components/shared/project-cover";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";
import { ProjectCtas } from "@/components/projects/project-ctas";

export function EngineeringLab({ projects }: { projects: Project[] }) {
  return (
    <section id="lab" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Engineering Lab
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Momentra Labs
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Independent products I own end to end.{" "}
            <a
              href="https://rentahub2026.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              RentaraH live
            </a>
            {" · "}
            <a
              href="https://lumina-momentra-labs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Lumina live
            </a>
          </p>
        </Reveal>
        <SpreadRule className="mt-5" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <RevealItem key={project.slug} index={index}>
              <article className="magazine-plate group flex h-full flex-col overflow-hidden border border-border transition-colors hover:border-border-bright">
                <Link
                  href={`/projects/${project.slug}/`}
                  data-cursor="VIEW"
                  className="contents"
                >
                  <div className="magazine-scan relative aspect-16/10">
                    <ProjectCover
                      project={project}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {project.demo ? (
                      <span className="absolute left-3 top-3 z-[5] inline-flex items-center gap-2 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground backdrop-blur-[2px]">
                        <span className="magazine-live-dot" aria-hidden />
                        Live
                      </span>
                    ) : null}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}/`}
                      data-cursor="VIEW"
                      className="hover:text-accent"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                    {project.tagline}
                  </p>
                  <ProjectCtas project={project} className="mt-4" />
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
