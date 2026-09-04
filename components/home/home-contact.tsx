import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/shared/container";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Reveal } from "@/components/shared/reveal";

export function HomeContact() {
  return (
    <section id="contact" className="magazine-spread scroll-mt-24 py-10 sm:py-12">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal variant="folio">
          <div id="about" className="scroll-mt-24">
            <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              About
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              {person.jobTitle}
              <span className="mt-1 block text-muted">
                {person.currentCompany}
              </span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {person.headline}
            </p>
            <Link
              href="/about/"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
              data-cursor="→"
            >
              Full about page
            </Link>
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Have a problem worth solving? {person.availability}
          </p>
          <ul className="mt-6 space-y-3">
            <li>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                Email
              </p>
              <a
                href={SOCIAL_LINKS.email}
                className="mt-1 inline-block text-foreground hover:text-accent"
                data-cursor="→"
              >
                {person.email}
              </a>
            </li>
            <li>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                Elsewhere
              </p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-foreground"
                  data-cursor="→"
                >
                  GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="hover:text-foreground"
                  data-cursor="→"
                >
                  LinkedIn
                </a>
                <Link href="/resume/" className="hover:text-foreground" data-cursor="→">
                  Resume
                </Link>
              </div>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.08} variant="ink">
          <div className="relative overflow-hidden border border-border bg-surface/50 p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,142,255,0.08),transparent_46%)]" />
            <span className="magazine-crop magazine-crop-tl left-3 top-3" />
            <span className="magazine-crop magazine-crop-tr right-3 top-3" />
            <span className="magazine-crop magazine-crop-bl bottom-3 left-3" />
            <span className="magazine-crop magazine-crop-br bottom-3 right-3" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  01 / Inquiry
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                  Manila
                </p>
              </div>
              <h3 className="mt-4 font-display text-2xl tracking-tight text-foreground">
                Write a note
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Hiring, leadership, or a product you want shipped — send context
                and I will reply directly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
