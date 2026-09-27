import { person } from "@/content/person";

export const biography = {
  path: "/biography/",
  title: "Al Andrew Paul Beltran",
  kicker: "Biography",
  lede: `${person.name} is a full-stack software engineer based in Manila, Philippines. He is Software Engineering Lead at Anglian Dental in the United Kingdom and the founder of Momentra Labs.`,
  photoAlt:
    "Al Andrew Paul Beltran, software engineering lead based in Manila, Philippines",
  photoCaption:
    "Al Andrew Paul Beltran in Manila. Official portrait for albeltran.com.",
  alsoKnownAs: [
    "Al Beltran",
    "Al Andrew Paul Teodosio Beltran",
    "Code by Pawpu",
  ],
  facts: [
    { label: "Full name", value: person.legalName },
    { label: "Also known as", value: "Al Beltran · Code by Pawpu" },
    { label: "Occupation", value: person.occupation },
    { label: "Current role", value: person.currentRole },
    { label: "Founder", value: person.labs },
    { label: "Based in", value: person.location },
    { label: "Website", value: "albeltran.com", href: person.url },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      paragraphs: [
        `${person.name} (also ${person.legalName}) is a Filipino full-stack software engineer. He designs and builds product interfaces, APIs, and event-driven systems using React, Next.js, TypeScript, JavaScript, Node.js, Java, Spring Boot, PHP, Laravel, PostgreSQL, MySQL, Docker, AWS, and Adobe Experience Manager.`,
        `He currently works as Software Engineering Lead at Anglian Dental, a dental equipment and surgery specialist in the United Kingdom. Independently he founded ${person.labs}, where he developed ${person.personalProducts.join(", ")}. Hiraya is in progress.`,
        `Previously he was a Software Engineer at Google via High Spring. Through Myridius he contributed to National Geographic, Disney Experiences, Disney Institute, and Disney Crew Management platforms. That work is client delivery via Myridius — not employment by Disney or National Geographic.`,
      ],
    },
    {
      id: "career",
      title: "Career",
      paragraphs: [
        "Beltran began professional engineering in 2019 at GoETU as a junior software engineer, then took freelance work on Upwork with end-to-end product ownership.",
        "At Accenture he delivered enterprise web, Adobe Experience Manager, and serverless platforms. Later roles at Yondu, Asurion, and Myridius covered full-stack client delivery, performance work (including a 15s→2s load-time improvement), and technical leadership on National Geographic and Disney programs.",
        "At Maya he built event-driven loyalty and card activation systems in fintech. He then worked as a Software Engineer at Google through High Spring. In 2026 he became Software Engineering Lead at Anglian Dental.",
      ],
    },
    {
      id: "momentra-labs",
      title: "Momentra Labs",
      paragraphs: [
        `Momentra Labs is the independent studio Beltran founded for personal products. The public catalog includes RentaraH (car rental marketplace), Hiraya (unofficial Philippine civil-service exam practice; not CSC-affiliated), Skyrealm, Lumina, Gloves Up, PocketPOS, and Cartify.`,
        "He also maintains the open-source TypeScript library @altbeltran/safe-action on GitHub.",
      ],
    },
    {
      id: "writing",
      title: "Writing",
      paragraphs: [
        "Beltran publishes engineering notes on albeltran.com under the byline Al Beltran. Topics include production systems, React and TypeScript, Node.js and Java services, AWS, and Adobe Experience Manager.",
      ],
    },
    {
      id: "identity",
      title: "Name and identity",
      paragraphs: [
        "He publishes as Al Beltran and Al Andrew Paul Beltran. His legal name is Al Andrew Paul Teodosio Beltran. Online he also uses Code by Pawpu and the handle pawpu. The official public profile is https://albeltran.com/.",
      ],
    },
  ],
} as const;
