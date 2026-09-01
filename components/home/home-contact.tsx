import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQ } from "@/components/shared/faq";
import { Container } from "@/components/shared/container";
import { homeFaqs } from "@/content/faqs";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";

export function HomeContact() {
  return (
    <section id="contact" className="py-24">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Have a problem worth solving?
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Let&apos;s build something useful. {person.availability}
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            <li>
              <a href={SOCIAL_LINKS.email} className="hover:text-foreground" data-cursor="→">
                {person.email}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="me noopener noreferrer"
                className="hover:text-foreground"
                data-cursor="→"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="hover:text-foreground"
                data-cursor="→"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/resume/" className="hover:text-foreground" data-cursor="→">
                Resume
              </Link>
            </li>
          </ul>
          <div className="mt-10 max-w-xl">
            <FAQ items={homeFaqs} title="Common questions" />
          </div>
        </div>
        <div className="border border-border p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Get in touch</h3>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
