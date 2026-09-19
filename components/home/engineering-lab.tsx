import Link from "next/link";
import { type Project, labSurfaceLabel } from "@/content/projects";
import { Container } from "@/components/shared/container";
import { DeviceCluster, clusterVariantFor } from "@/components/projects/device-cluster";
import { Reveal, RevealItem, SpreadRule } from "@/components/shared/reveal";
import { ProjectCtas } from "@/components/projects/project-ctas";
import { ProjectStatusBadge } from "@/components/shared/project-status-badge";

export function EngineeringLab({ projects }: { projects: Project[] }) {
  return (
    <section id="lab" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container>
        <Reveal>
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
              href="https://hiraya-phi.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Hiraya in progress
            </a>
            {" · "}
            <a
              href="https://skyrealm-ruby.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Skyrealm live
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <RevealItem key={project.slug} index={index} className="h-full min-w-0">
              <article className="showcase-card magazine-plate group border border-border transition-colors hover:border-border-bright">
                <div className="magazine-scan relative">
                  <DeviceCluster
                    project={project}
                    variant={clusterVariantFor(project, "card")}
                  />
                  <span className="pointer-events-none absolute left-4 top-4 z-[5] font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                    {labSurfaceLabel(project)}
                  </span>
                  <ProjectStatusBadge project={project} />
                </div>
                <div className="showcase-card-copy">
                  <h3 className="font-display text-2xl tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}/`}
                      data-cursor="VIEW"
                      className="hover:text-accent"
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted [overflow-wrap:anywhere]">
                    {project.tagline}
                  </p>
                  <div className="mt-auto flex min-h-11 items-end pt-4">
                    <ProjectCtas project={project} />
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
