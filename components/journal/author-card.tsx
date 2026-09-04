import Link from "next/link";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";

export function AuthorCard() {
  return (
    <aside className="border border-border bg-surface/40 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        Author
      </p>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
        <Link href="/author/al-beltran/" className="hover:text-accent">
          {person.shortName}
        </Link>
      </h2>
      <p className="mt-1 text-sm text-muted">{person.currentRole}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Full-stack software engineer in Manila. Writes about the systems he
        builds and reviews: React, TypeScript, Node.js, Java, Laravel, SQL, AWS,
        and AEM.
      </p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link href="/about/" className="text-accent hover:underline">
          About
        </Link>
        <Link href="/author/al-beltran/" className="text-accent hover:underline">
          Author page
        </Link>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="me noopener noreferrer"
          className="text-accent hover:underline"
        >
          GitHub
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="me noopener noreferrer"
          className="text-accent hover:underline"
        >
          LinkedIn
        </a>
      </p>
    </aside>
  );
}
