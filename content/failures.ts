export type FailureEntry = {
  id: string;
  title: string;
  category: string;
  year: string;
  placeholder: boolean;
  tried: string;
  why: string;
  happened: string;
  broke: string;
  learned: string;
  now: string;
};

export const failures: readonly FailureEntry[] = [
  {
    id: "local-first-marketplace",
    title: "Treating a shared ledger like an offline notebook",
    category: "Architecture",
    year: "Essay / 2026",
    placeholder: false,
    tried:
      "I wrote about applying offline-first habits from a personal boxing app to a vehicle marketplace.",
    why:
      "Local-first feels like the same 'it should work on a bad radio' problem. Gloves Up really does live on-device.",
    happened:
      "A marketplace is a shared ledger. Availability is not a private notebook. The public essay is the record: pretending those are the same architecture is how you double-book a vehicle.",
    broke:
      "The idea, not a production outage. The failure was conceptual — and it is the useful part.",
    learned:
      "Closed personal datasets and shared booking state are different products. Sync is a product decision, not a library.",
    now:
      "I keep Gloves Up offline-first. RentaraH stays a networked ledger. I would not sell 'local-first' as a default for inventory.",
  },
  {
    id: "placeholder-rewrite",
    title: "A rewrite that never shipped",
    category: "Abandoned",
    year: "Placeholder",
    placeholder: true,
    tried:
      "[Replace] I started a clean-room rewrite of a working service because the old module names embarrassed me.",
    why:
      "[Replace] I thought a weekend of greenfield would be cheaper than another year of seams.",
    happened:
      "[Replace] The rewrite tracked the old bugs plus new ones, and the working service kept taking the real traffic.",
    broke:
      "[Replace] Time, morale, and a branch nobody could review.",
    learned:
      "[Replace] Rewrite the seam that hurts. Leave the rest until a metric forces it.",
    now:
      "[Replace] I would extract one interface, put tests on it, and ship that. This card is a template — not a claim about a named employer.",
  },
  {
    id: "placeholder-feature",
    title: "A feature we removed after launch",
    category: "Removed",
    year: "Placeholder",
    placeholder: true,
    tried:
      "[Replace] We shipped a preference surface that looked complete in staging.",
    why:
      "[Replace] Users had asked for control. The mockups were clear.",
    happened:
      "[Replace] Support load went up. Almost nobody changed the default. The extra path bit a billing edge case.",
    broke:
      "[Replace] An invariant that only existed because of the new screen.",
    learned:
      "[Replace] A setting is a commitment to test every combination. Defaults are a product.",
    now:
      "[Replace] I would instrument the old path, add one control, and delete the rest. Marked placeholder so it is not mistaken for a client postmortem.",
  },
];
