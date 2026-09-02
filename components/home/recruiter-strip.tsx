import Link from "next/link";
import { experience } from "@/content/experience";
import { getFeaturedProjects, getLabProjects } from "@/content/projects";
import { person, technologies } from "@/content/person";
import { worldMarksLine } from "@/content/marks";
import { Container } from "@/components/shared/container";
import { RecruiterToggle } from "@/components/layout/recruiter-toggle";
import { SOCIAL_LINKS } from "@/lib/constants";

export function RecruiterStrip() {
  const featured = getFeaturedProjects();
  const lab = getLabProjects();
  const recent = experience.slice(0, 4);

  return (
    <section className="recruiter-only border-b border-border py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Recruiter view
          </p>
          <RecruiterToggle className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted" />
        </div>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {person.shortName} · {person.currentRole} · {person.founderTitle}
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          {worldMarksLine}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-muted">{person.summary}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {technologies.join(" · ")}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Selected experience
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {recent.map((item) => (
                <li key={item.id}>
                  <span className="text-foreground">{item.role}</span> · {item.company}{" "}
                  <span className="text-muted-dim">({item.duration})</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Selected projects
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="text-accent hover:underline"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Momentra Labs
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {lab.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="text-accent hover:underline"
                  >
                    {project.name}
                  </Link>
                  <span className="text-muted-dim"> — {project.tagline}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4 text-sm">
              <Link href="/resume/" className="text-accent hover:underline">
                Resume
              </Link>
              <a href={SOCIAL_LINKS.email} className="text-accent hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
