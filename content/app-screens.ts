export type AppScreen = {
  kicker: string;
  title: string;
  detail: string;
  src?: string;
  alt?: string;
};

const GLOVES_UP: AppScreen[] = [
  {
    kicker: "01 Splash",
    title: "Lacing up",
    detail: "A Momentra Labs product. No signup.",
    src: "/projects/glovesup/glovesup-1.jpg",
    alt: "Gloves Up splash screen — boxing glove mark and Lacing up",
  },
  {
    kicker: "02 Welcome",
    title: "Show up",
    detail: "Put in the rounds. Everything stays on the phone.",
    src: "/projects/glovesup/glovesup-2.jpg",
    alt: "Gloves Up welcome screen — Show up. Put in the rounds. Get started",
  },
  {
    kicker: "03 Home",
    title: "Today's focus",
    detail: "Readiness check-in and a start-training path.",
    src: "/projects/glovesup/glovesup-3.jpg",
    alt: "Gloves Up home — Good morning, technical combinations, and quick train tools",
  },
  {
    kicker: "04 Train",
    title: "Timer first",
    detail: "Boxing timer, drills, combos, and shadowboxing.",
    src: "/projects/glovesup/glovesup-4.jpg",
    alt: "Gloves Up train tools — boxing timer, drills, punch combinations, and session builder",
  },
  {
    kicker: "05 Stats",
    title: "Volume",
    detail: "Local history. Not a skill ranking.",
    src: "/projects/glovesup/glovesup-5.jpg",
    alt: "Gloves Up stats — no training yet and start timer",
  },
  {
    kicker: "06 Round",
    title: "Work clock",
    detail: "Round 1 of 6 with pause and finish.",
    src: "/projects/glovesup/glovesup-6.jpg",
    alt: "Gloves Up training timer — 2:58 remaining on technical combinations",
  },
];

const POCKETPOS: AppScreen[] = [
  {
    kicker: "01 Home",
    title: "At a glance",
    detail: "Sales, register, then start selling.",
    src: "/projects/pocketpos/pocketpos-1.jpg",
    alt: "PocketPOS home — today at a glance, register, and start selling",
  },
  {
    kicker: "02 Product",
    title: "Add a line",
    detail: "Name, SKU, price, and stock on the phone.",
    src: "/projects/pocketpos/pocketpos-2.jpg",
    alt: "PocketPOS add product — photo, name, SKU, category, price, and stock",
  },
  {
    kicker: "03 Register",
    title: "Open the till",
    detail: "Set the cash float. It works offline.",
    src: "/projects/pocketpos/pocketpos-3.jpg",
    alt: "PocketPOS open register — opening cash float and open & sell",
  },
  {
    kicker: "04 Settings",
    title: "The shop",
    detail: "Business, language, and currency.",
    src: "/projects/pocketpos/pocketpos-4.jpg",
    alt: "PocketPOS settings — business, language, and currency",
  },
  {
    kicker: "05 History",
    title: "Receipts",
    detail: "Completed sales stay on the device.",
    src: "/projects/pocketpos/pocketpos-5.jpg",
    alt: "PocketPOS history — no sales yet",
  },
  {
    kicker: "06 Catalog",
    title: "Products",
    detail: "Build the catalog from this phone.",
    src: "/projects/pocketpos/pocketpos-6.jpg",
    alt: "PocketPOS products — empty catalog and add product",
  },
];

const CARTIFY: AppScreen[] = [
  {
    kicker: "01 Splash",
    title: "Cart ready",
    detail: "Know your total before checkout.",
    src: "/projects/cartify/cartify-1.jpg",
    alt: "Cartify splash — Getting your cart ready",
  },
  {
    kicker: "02 Welcome",
    title: "Meet Cartify",
    detail: "Fast, simple, and offline.",
    src: "/projects/cartify/cartify-2.jpg",
    alt: "Cartify welcome — Meet Cartify",
  },
  {
    kicker: "03 Home",
    title: "This trip",
    detail: "Budget, scan a price, or add an item.",
    src: "/projects/cartify/cartify-3.jpg",
    alt: "Cartify home — budget, scan price, and add item",
  },
  {
    kicker: "04 List",
    title: "Before you shop",
    detail: "A priced list with a running remainder.",
    src: "/projects/cartify/cartify-4.jpg",
    alt: "Cartify shopping list with priced items",
  },
  {
    kicker: "05 Scan",
    title: "Price tag",
    detail: "Put the price in the box, then tap.",
    src: "/projects/cartify/cartify-5.jpg",
    alt: "Cartify scan price camera",
  },
  {
    kicker: "06 Settings",
    title: "Your aisle",
    detail: "Budget, currency, language, and theme.",
    src: "/projects/cartify/cartify-6.jpg",
    alt: "Cartify settings — budget, currency, language, and appearance",
  },
];

const SCREENS: Record<string, AppScreen[]> = {
  "gloves-up": GLOVES_UP,
  pocketpos: POCKETPOS,
  cartify: CARTIFY,
  quickcart: CARTIFY,
};

export function appScreensFor(slug: string): AppScreen[] {
  return SCREENS[slug] ?? [];
}
