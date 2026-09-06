import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import { person } from "@/content/person";
import { coverMarksLine } from "@/content/marks";
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
            {person.currentRole} · {person.founderTitle}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim">
            {coverMarksLine}
          </p>
          <p className="mt-1 text-sm text-muted-dim">Manila, Philippines</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href="/about/" data-cursor="→" className="hover:text-foreground">
            About
          </Link>
          <Link href="/experience/" data-cursor="→" className="hover:text-foreground">
            Experience
          </Link>
          <Link href="/projects/" data-cursor="→" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/lab/" data-cursor="→" className="hover:text-foreground">
            Lab
          </Link>
          <Link href="/contact/" data-cursor="→" className="hover:text-foreground">
            Contact
          </Link>
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
          <Link href="/blog/" data-cursor="→" className="hover:text-foreground">
            Journal
          </Link>
          <Link href="/topics/" data-cursor="→" className="hover:text-foreground">
            Topics
          </Link>
          <Link href="/interviews/" data-cursor="→" className="hover:text-foreground">
            Interviews
          </Link>
          <Link href="/author/al-beltran/" data-cursor="→" className="hover:text-foreground">
            Author
          </Link>
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
