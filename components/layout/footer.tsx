import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import { person } from "@/content/person";
import { Container } from "@/components/shared/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-foreground">
            AL BELTRAN
          </p>
          <p className="mt-2 text-sm text-muted">
            {person.jobTitle} · {person.founderTitle}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="me noopener noreferrer"
            data-cursor="→"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            data-cursor="→"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a href={SOCIAL_LINKS.email} data-cursor="→" className="hover:text-foreground">
            Email
          </a>
          <Link href="/resume/" data-cursor="→" className="hover:text-foreground">
            Resume
          </Link>
        </nav>
        <p className="text-xs text-muted-dim">
          © {year} {person.name}
        </p>
      </Container>
    </footer>
  );
}
