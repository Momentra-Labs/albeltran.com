export type BuildingItem = {
  id: string;
  index: string;
  kind: "Project" | "Experiment" | "Research";
  title: string;
  summary: string;
  href?: string;
};

/** Update this file when the living "Currently building" strip should change. */
export const currentlyBuilding: readonly BuildingItem[] = [
  {
    id: "momentra",
    index: "01",
    kind: "Project",
    title: "Momentra Labs products",
    summary:
      "Hiraya is in progress at hiraya-phi.vercel.app, next to RentaraH, Skyrealm, Lumina, and the rest of the independent lab.",
    href: "/#lab",
  },
  {
    id: "eng-lab",
    index: "02",
    kind: "Experiment",
    title: "Engineering Lab desks",
    summary:
      "Browser-only incidents, system design, and SQL. Progress stays on the device.",
    href: "/lab/",
  },
  {
    id: "journal",
    index: "03",
    kind: "Research",
    title: "Event-driven reliability notes",
    summary:
      "AWS patterns for reconciliation and the Engineering Journal — writing that can be cited.",
    href: "/blog/",
  },
];
