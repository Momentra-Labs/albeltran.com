import { Code2, Link2, Mail, MapPin, AtSign } from "lucide-react";
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
  description: `Contact Al Beltran (Al Andrew Paul Beltran) — Senior Software Engineer and Full-Stack Developer in the Philippines. Email, LinkedIn, GitHub, and availability.`,
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
        title="Let’s build something remarkable."
        description="Whether you’re hiring for a senior engineering role, need technical leadership, or want to explore a collaboration — reach out."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact" },
        ]}
      />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Availability
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {person.availability}
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={SOCIAL_LINKS.email}
                className="flex items-center gap-3 border border-border bg-surface/40 p-4 transition-colors hover:border-border-bright"
              >
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    Email
                  </p>
                  <p className="text-sm text-foreground">{person.email}</p>
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="me noopener noreferrer"
                className="flex items-center gap-3 border border-border bg-surface/40 p-4 transition-colors hover:border-border-bright"
              >
                <Link2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    LinkedIn
                  </p>
                  <p className="text-sm text-foreground">linkedin.com/in/al-beltran</p>
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="me noopener noreferrer"
                className="flex items-center gap-3 border border-border bg-surface/40 p-4 transition-colors hover:border-border-bright"
              >
                <Code2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    GitHub
                  </p>
                  <p className="text-sm text-foreground">github.com/codemoon2019</p>
                </div>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="me noopener noreferrer"
                className="flex items-center gap-3 border border-border bg-surface/40 p-4 transition-colors hover:border-border-bright"
              >
                <AtSign className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    Instagram
                  </p>
                  <p className="text-sm text-foreground">@codebypawpu</p>
                </div>
              </a>
              <div className="flex items-center gap-3 border border-border bg-surface/40 p-4">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-dim">
                    Location
                  </p>
                  <p className="text-sm text-foreground">{person.location}</p>
                </div>
              </div>
            </div>

            <FAQ items={contactFaqs} />
          </div>

          <div className="border border-border bg-surface/40 p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
