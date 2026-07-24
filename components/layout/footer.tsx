import Link from "next/link";
import { Code2, Link2, Mail, AtSign } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { person } from "@/content/person";
import { Container } from "@/components/shared/container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">
              {person.shortName}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {person.headline}
            </p>
            <p className="mt-4 text-sm text-muted-dim">{person.location}</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Navigate
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Connect
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Code2 className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Link2 className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <AtSign className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.email}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. Built with Next.js.
          </p>
          <p>
            {person.shortName} · {person.brand} — Manila, PH
          </p>
        </div>
      </Container>
    </footer>
  );
}
