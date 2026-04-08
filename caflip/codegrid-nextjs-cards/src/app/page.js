import Card from "./Card";
import "./globals.css";

const CARDS = [
  {
    id: 1,
    title: "Building Modern UIs with Next.js",
    description:
      "Explore how to create beautiful, responsive user interfaces using Next.js and Tailwind CSS. Learn best practices for component architecture and design systems.",
    imageSrc: "/images/card/dancerBg.svg",
    tags: ["Next.js", "Tailwind"],
    href: "#",
    date: "March 8, 2025",
  },
  {
    id: 2,
    title: "Mastering CSS Animations",
    description:
      "Deep-dive into CSS keyframe animations, transitions, and the Web Animations API. Build performant, silky-smooth motion that delights users.",
    imageSrc: "/images/card/normBg.svg",
    tags: ["CSS", "Animation"],
    href: "#",
    date: "February 20, 2025",
  },
  {
    id: 3,
    title: "React Server Components Explained",
    description:
      "Understand the mental model behind React Server Components, when to reach for them, and how they change the way you think about data-fetching.",
    imageSrc: "/images/card/dancerBg.svg",
    tags: ["React", "Next.js"],
    href: "#",
    date: "January 15, 2025",
  },
  {
    id: 4,
    title: "TypeScript Generics in Depth",
    description:
      "Generics are one of TypeScript's most powerful — and confusing — features. This guide breaks them down from first principles with real-world examples.",
    imageSrc: "/images/card/normBg.svg",
    tags: ["TypeScript"],
    href: "#",
    date: "December 5, 2024",
  },
  {
    id: 5,
    title: "Optimising Web Performance",
    description:
      "Core Web Vitals, image optimisation, lazy loading, and bundle analysis — everything you need to ship fast experiences every time.",
    imageSrc: "/images/card/dancerBg.svg",
    tags: ["Performance", "Web"],
    href: "#",
    date: "November 22, 2024",
  },
  {
    id: 6,
    title: "Accessible UI: Beyond the Basics",
    description:
      "WCAG compliance is only the floor. Learn how to build truly inclusive interfaces through keyboard navigation, ARIA live regions, and focus management.",
    imageSrc: "/images/card/normBg.svg",
    tags: ["a11y", "UI"],
    href: "#",
    date: "October 10, 2024",
  },
];

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-4 py-16">
      {/* ── Page header ── */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-[var(--card-text)]">
          Latest Articles
        </h1>
        <p className="text-base text-[var(--card-muted)]">
          Discover tutorials, tips, and deep-dives on modern web development.
        </p>
      </div>

      {/* ── Cards grid ── */}
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6">
        {CARDS.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </main>
  );
}
