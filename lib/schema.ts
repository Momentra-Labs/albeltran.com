import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { person, oxfordJoin } from "@/content/person";
import type { FAQItem } from "@/content/faqs";
import type { Project } from "@/content/projects";

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: person.name,
    additionalName: person.additionalName,
    alternateName: [...person.aliases],
    givenName: "Al Andrew Paul",
    familyName: "Beltran",
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/`,
    image: {
      "@type": "ImageObject",
      url: person.image,
      contentUrl: person.image,
      caption: `${person.name} (${person.legalName}) — ${person.occupation} and founder of ${person.labs}`,
    },
    jobTitle: person.occupation,
    hasOccupation: {
      "@type": "Occupation",
      name: person.occupation,
    },
    description: person.summary,
    email: person.email,
    nationality: { "@type": "Country", name: "Philippines" },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
      addressLocality: "Manila",
    },
    homeLocation: {
      "@type": "Place",
      name: person.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "PH",
        addressLocality: "Manila",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: "Google",
      description: "Software Engineer engagement via High Spring",
    },
    affiliation: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#momentra-labs`,
      name: person.labs,
      founder: { "@id": `${SITE_URL}/#person` },
      description:
        `Independent studio founded by Al Andrew Paul Beltran for personal products ${oxfordJoin(person.personalProducts)}.`,
    },
    owns: person.personalProducts.map((name) => ({
      "@type": "SoftwareApplication",
      name,
      creator: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
    })),
    sameAs: [...person.sameAs],
    knowsAbout: [...person.knowsAbout],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional",
      email: person.email,
      url: `${SITE_URL}/contact/`,
      availableLanguage: ["English", "Filipino"],
    },
  };
}

export function momentraLabsSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#momentra-labs`,
    name: person.labs,
    founder: { "@id": `${SITE_URL}/#person` },
    description:
      `Independent studio founded by Al Andrew Paul Beltran for personal products ${oxfordJoin(person.personalProducts)}.`,
  };
}

export function labProductsSchema(projects: Project[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#momentra-products`,
    name: "Momentra Labs personal products by Al Beltran",
    description:
      `Personal products Al Andrew Paul Beltran developed as founder of Momentra Labs: ${oxfordJoin(person.personalProducts)}.`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: `${SITE_URL}/projects/${project.slug}/`,
        item: {
        "@type": "SoftwareApplication",
        name: project.name,
        description: project.overview,
        url: project.demo ?? `${SITE_URL}/projects/${project.slug}/`,
        ...(project.apk
          ? {
              installUrl: project.apk.startsWith("http")
                ? project.apk
                : `${SITE_URL}${project.apk}`,
              operatingSystem: "Android",
            }
          : {}),
        author: { "@id": `${SITE_URL}/#person` },
        creator: { "@id": `${SITE_URL}/#person` },
        keywords: [project.name, person.labs, person.shortName].join(", "),
      },
    })),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: `${person.shortName} — ${person.occupation}`,
    alternateName: [
      "Al Beltran Portfolio",
      "Al Andrew Paul Beltran Portfolio",
      `${person.legalName} Portfolio`,
      "Code by Pawpu",
    ],
    description: person.summary,
    about: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-PH",
    publisher: { "@id": `${SITE_URL}/#person` },
    copyrightHolder: { "@id": `${SITE_URL}/#person` },
  };
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: `${SITE_URL}/`,
    name: `${person.shortName} — ${person.occupation}`,
    description: person.summary,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: person.image,
      contentUrl: person.image,
      caption: `${person.name} (${person.legalName}) — ${person.occupation}`,
    },
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
    "@type": ["BlogPosting", "Article"],
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: {
      "@type": "Person",
      name: person.name,
      url: SITE_URL,
      image: person.image,
    },
    image: person.image,
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
