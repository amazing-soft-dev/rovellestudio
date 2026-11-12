export type Project = {
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
};

export type PlayItem = {
  slug: string;
  title: string;
  category: string;
  image: string;
  ratio: "portrait" | "square" | "landscape";
};

export type Person = {
  name: string;
  role: string;
  image: string;
  socials: string;
};

export type Service = {
  number: string;
  title: string;
  image: string;
  body: string;
};

export const projects: Project[] = [
  {
    slug: "holla-brand-design",
    title: "Holla",
    category: "Branding",
    subtitle: "Identity for a voice-notes app.",
    image: "holla.jpg",
  },
  {
    slug: "scrobblit-ai-note-app",
    title: "Scrobblit",
    category: "Product & Web Design",
    subtitle: "An AI note app with a quieter interface.",
    image: "scrobblit.jpg",
  },
  {
    slug: "solar-inc-landing",
    title: "Solar Inc.",
    category: "Web Design",
    subtitle: "Marketing site for clean energy.",
    image: "solar.jpg",
  },
  {
    slug: "rock-skincare-branding",
    title: "Rock Skincare",
    category: "Branding",
    subtitle: "A mineral skincare system.",
    image: "rock.jpg",
  },
  {
    slug: "tsebaot-cafe",
    title: "Tsebaot Café",
    category: "Branding",
    subtitle: "Identity and illustration.",
    image: "tsebaot.jpg",
  },
  {
    slug: "nuzz-brand-design",
    title: "Nuzz",
    category: "Branding",
    subtitle: "A soft identity for a hard problem.",
    image: "nuzz.jpg",
  },
  {
    slug: "bird-brand-identity",
    title: "Bird",
    category: "Branding",
    subtitle: "A mark that holds still.",
    image: "bird.jpg",
  },
  {
    slug: "bloop-brand-design",
    title: "Bloop",
    category: "Branding",
    subtitle: "Sound, color, and a round wordmark.",
    image: "bloop.jpg",
  },
];

export const playground: PlayItem[] = [
  { slug: "soft-geometry", title: "Soft Geometry", category: "3D", image: "soft-geometry.jpg", ratio: "portrait" },
  { slug: "grotesk-specimen", title: "Grotesk Specimen", category: "Typography", image: "grotesk.jpg", ratio: "portrait" },
  { slug: "pocket-ui", title: "Pocket UI", category: "Interface", image: "pocket-ui.jpg", ratio: "square" },
  { slug: "chroma-fields", title: "Chroma Fields", category: "Color", image: "chroma.jpg", ratio: "landscape" },
  { slug: "editorial-grid", title: "Editorial Grid", category: "Editorial", image: "editorial.jpg", ratio: "portrait" },
  { slug: "mineral-pack", title: "Mineral Pack", category: "Packaging", image: "mineral.jpg", ratio: "portrait" },
  { slug: "concrete-light", title: "Concrete Light", category: "Photo", image: "concrete.jpg", ratio: "square" },
  { slug: "night-trails", title: "Night Trails", category: "Motion", image: "night-trails.jpg", ratio: "landscape" },
  { slug: "landing-study", title: "Landing Study", category: "Web", image: "landing.jpg", ratio: "landscape" },
  { slug: "chrome-blob", title: "Chrome Blob", category: "3D", image: "chrome-blob.jpg", ratio: "square" },
  { slug: "street-posters", title: "Street Posters", category: "Print", image: "street-posters.jpg", ratio: "portrait" },
  { slug: "glass-forms", title: "Glass Forms", category: "3D", image: "glass.jpg", ratio: "square" },
  { slug: "stationery-set", title: "Stationery Set", category: "Branding", image: "stationery.jpg", ratio: "landscape" },
  { slug: "neon-signal", title: "Neon Signal", category: "Motion", image: "neon.jpg", ratio: "landscape" },
  { slug: "paper-shapes", title: "Paper Shapes", category: "Craft", image: "paper.jpg", ratio: "portrait" },
];

export const services: Service[] = [
  {
    number: "01",
    title: "Brand Identity",
    image: "service-brand.jpg",
    body: "Strategy, naming, logo systems and visual languages built to move — from first sketch to a toolkit your team can actually use.",
  },
  {
    number: "02",
    title: "Web & Product",
    image: "service-web.jpg",
    body: "Marketing sites and product interfaces with the same type, motion, and restraint as the brand they belong to.",
  },
  {
    number: "03",
    title: "Motion Systems",
    image: "service-motion.jpg",
    body: "Timing, easing, and transitions that make a product feel intentional instead of decorated.",
  },
  {
    number: "04",
    title: "Art Direction",
    image: "service-art.jpg",
    body: "Photography, stills, and campaigns that share one light, one palette, and one point of view.",
  },
];

export const team: Person[] = [
  { name: "Maja Nowak", role: "Founder & Creative Director", image: "maja.jpg", socials: "IG · LI" },
  { name: "Leo Hart", role: "Design Director", image: "leo.jpg", socials: "IG · LI" },
  { name: "Ida Brandt", role: "Motion Lead", image: "ida.jpg", socials: "IG · X" },
  { name: "Oskar Lind", role: "Brand Designer", image: "oskar.jpg", socials: "IG · LI" },
  { name: "Nina Sol", role: "Producer", image: "nina.jpg", socials: "LI" },
  { name: "Tomas Reyes", role: "Creative Developer", image: "tomas.jpg", socials: "GH · X" },
];

export const awards = [
  { name: "Awwwards", category: "Site of the Day", count: "×3" },
  { name: "CSS Design Awards", category: "UI, UX & Innovation", count: "×2" },
  { name: "FWA", category: "FWA of the Day", count: "×1" },
  { name: "Red Dot", category: "Brand & Communication Design", count: "×2" },
  { name: "European Design Awards", category: "Visual Identity", count: "×1" },
];

export const stats = [
  { value: "07", label: "Years in motion" },
  { value: "112", label: "Projects shipped" },
  { value: "14", label: "Awards & mentions" },
  { value: "48", label: "Happy clients" },
];

export const plans = [
  {
    name: "Sprint",
    price: "€4,800",
    description: "For early-stage brands with light creative needs.",
    features: ["Up to 20 hours a month", "Web & brand design", "Priority: 5 business days", "Dedicated designer"],
  },
  {
    name: "Studio",
    price: "€7,200",
    description: "For growing teams that ship something every month.",
    features: ["Up to 40 hours a month", "Design + motion direction", "Priority: 3 business days", "Dedicated design pair"],
  },
  {
    name: "Partner",
    price: "€11,900",
    description: "For brands that need a creative partner, not a vendor.",
    features: ["Unlimited requests", "Strategy workshops", "Priority: next-day turnaround", "Senior team on call"],
  },
];

export const faqs = [
  {
    question: "How do you start a new project?",
    answer: "With a short call and a written brief. We confirm the outcome, the constraints, and who decides, then we start on the work — not a deck about the work.",
  },
  {
    question: "What kind of projects do you work on?",
    answer: "Brand identities, marketing sites, and product interfaces. If it needs type, motion, and a point of view, it is probably a fit.",
  },
  {
    question: "Do you only work with established brands?",
    answer: "No. We work with founders and with teams that already have a name. The work has to be worth doing either way.",
  },
  {
    question: "How long does a typical project take?",
    answer: "An identity is usually six to ten weeks. A marketing site is four to eight. A retained partnership runs month to month.",
  },
  {
    question: "Do you build in Framer?",
    answer: "We design the system and the motion. Engineering lands in whatever the product already uses. This site itself is Next.js.",
  },
  {
    question: "What if I’m not sure what I need yet?",
    answer: "Book the 30 minute intro. We will tell you if you need an identity, a site, or just a clearer sentence.",
  },
];

export const nav = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
] as const;

export const studio = {
  name: "Rovelle",
  email: "hello@rovelle.studio",
  phone: "+48 22 555 01 26",
  phoneHref: "tel:+48225550126",
  address: ["Mokotowska 12,", "00‑561 Warsaw, PL"],
  location: "Warsaw, PL — Open for projects",
  hours: "Mon — Fri, 9:00 — 18:00 CET",
  booking: "Now booking — Q1 2027",
  established: "Est. 2019 — Warsaw, PL",
  intro: "Rovelle — an independent studio shaping brands and digital products through motion, clarity and craft.",
  principlesLead:
    "Rovelle is an independent studio shaping brands and digital products through motion, clarity and craft. We help ambitious teams make work that feels sharp, alive and impossible to ignore.",
  principles: [
    "Our process is built around clarity, rhythm and intention. We question what should stay, what should go and what needs to move harder — whether it’s an identity, a website or a motion system. The goal is always the same: work that feels sharp, distinct and alive.",
    "We stay small by choice. That means direct collaboration with the people doing the work, fast decisions and a process where every frame has to earn its place. No filler, no decoration for its own sake.",
  ],
  playgroundNote:
    "A space to explore visual directions, motion and interaction without overthinking. Some ideas grow into real projects — others stay here as part of the process.",
  contactNote:
    "Tell us what you’re building — a brand, a product or something that doesn’t have a name yet. We reply within two working days.",
  scheduleNote: "30 min intro — Google Meet",
  scheduleHref: "https://cal.com",
};

export const images = {
  studio: "studio.jpg",
};

/** Every photo file under public/photos, each referenced once. */
export function photoReferences(): string[] {
  return [
    ...projects.map((item) => item.image),
    ...playground.map((item) => item.image),
    ...services.map((item) => item.image),
    ...team.map((item) => item.image),
    images.studio,
  ];
}
