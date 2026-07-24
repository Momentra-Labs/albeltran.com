import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { person } from "@/content/person";
import type { FAQItem } from "@/content/faqs";
import type { Project } from "@/content/projects";

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: person.name,
    alternateName: [person.shortName, person.brand, "pawpu"],
    givenName: "Al Andrew Paul",
    familyName: "Beltran",
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: person.image,
      caption: `${person.name} — portfolio`,
    },
    jobTitle: person.jobTitle,
    description: person.summary,
    email: person.email,
    nationality: { "@type": "Country", name: "Philippines" },
    homeLocation: {
      "@type": "Place",
      name: person.location,
    },
    worksFor: {
      "@type": "Organization",
      name: "Google",
      description: "Software Engineer engagement via High Spring",
    },
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional",
      email: person.email,
      availableLanguage: ["English", "Filipino"],
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${person.name} — Software Engineer Portfolio`,
    alternateName: ["Al Beltran Portfolio", "Code by Pawpu"],
    description: person.summary,
    inLanguage: "en-PH",
    publisher: { "@id": `${SITE_URL}/#person` },
    copyrightHolder: { "@id": `${SITE_URL}/#person` },
  };
}

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: person.image,
    },
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.overview,
    programmingLanguage: project.techStack,
    codeRepository: project.repository,
    url: `${SITE_URL}/projects/${project.slug}/`,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    keywords: project.techStack.join(", "),
  };
}

export function articleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: {
      "@type": "Person",
      name: person.name,
      url: SITE_URL,
    },
    keywords: tags?.join(", "),
    inLanguage: "en-PH",
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/#blog`,
      name: `${SITE_NAME} Blog`,
    },
  };
}

export function graphSchema(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
