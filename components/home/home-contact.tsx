import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQ } from "@/components/shared/faq";
import { Container } from "@/components/shared/container";
import { homeFaqs } from "@/content/faqs";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Reveal } from "@/components/shared/reveal";

export function HomeContact() {
  return (
    <section id="contact" className="magazine-spread py-16 sm:py-20">
      <Container className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal variant="folio">
          <p className="magazine-spread-kicker">Vol. 01 / Manila</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Have a problem worth solving?
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Let&apos;s build something useful. {person.availability}
          </p>
          <ul className="mt-10 space-y-4">
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
          <div className="mt-12 max-w-xl">
            <FAQ items={homeFaqs} title="Common questions" />
          </div>
        </Reveal>
        <Reveal delay={0.08} variant="ink">
          <div className="relative overflow-hidden border border-border bg-surface/50 p-7 sm:p-10">
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
              <h3 className="mt-4 font-display text-3xl tracking-tight text-foreground">
                Write a note
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Hiring, leadership, or a product you want shipped — send context and I will reply directly.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
