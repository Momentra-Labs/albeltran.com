import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { FAQ } from "@/components/shared/faq";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactForm } from "@/components/contact/contact-form";
import { contactFaqs } from "@/content/faqs";
import { person } from "@/content/person";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Al Beltran",
  description: `Contact Al Beltran (Al Andrew Paul Beltran) — ${person.currentRole} and founder of Momentra Labs. Manila, Philippines.`,
  path: "/contact/",
});

export default function ContactPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: "/contact/",
      name: `Contact · ${person.shortName}`,
      description: `Professional contact details for ${person.name}.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact/" },
    ]),
    faqSchema(contactFaqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Contact"
        title="Have a problem worth solving?"
        description="Whether you’re hiring for a senior engineering role, need technical leadership, or want to explore a collaboration — reach out."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact" },
        ]}
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Availability
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {person.availability}
              </p>
            </div>

            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  Email
                </p>
                <a
                  href={SOCIAL_LINKS.email}
                  className="mt-1 inline-block text-foreground hover:text-accent"
                >
                  {person.email}
                </a>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  LinkedIn
                </p>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="mt-1 inline-block text-foreground hover:text-accent"
                >
                  linkedin.com/in/al-beltran
                </a>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  GitHub
                </p>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="mt-1 inline-block text-foreground hover:text-accent"
                >
                  github.com/codemoon2019
                </a>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  Instagram
                </p>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="mt-1 inline-block text-foreground hover:text-accent"
                >
                  @codebypawpu
                </a>
              </li>
              <li>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                  Location
                </p>
                <p className="mt-1 text-foreground">{person.location}</p>
              </li>
            </ul>

            <FAQ items={contactFaqs} />
          </div>

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
              <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">
                Write a note
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Hiring, leadership, or a product you want shipped — send context and I will reply directly.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
