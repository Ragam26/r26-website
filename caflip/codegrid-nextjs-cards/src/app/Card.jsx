import Image from "next/image";
import Link from "next/link";

/**
 * Card — reusable card component styled exclusively with Tailwind CSS.
 *
 * Props:
 *  title       — Card heading
 *  description — Short body text (auto-truncated to 3 lines)
 *  imageSrc    — Absolute URL or public-folder path to the card image
 *  imageAlt    — Alt text for the image (falls back to title)
 *  tags        — Array of tag strings shown as pills
 *  href        — Link destination (wraps the whole card)
 *  date        — Optional date string shown at the bottom
 */
export default function Card({
  title = "Card Title",
  description = "Card description goes here. Add more text to see the truncation in action.",
  imageSrc = "/images/card/dancerBg.svg",
  imageAlt,
  tags = [],
  href = "#",
  date = "",
}) {
  return (
    <Link
      href={href}
      className="group relative flex w-72 flex-col overflow-hidden rounded-2xl bg-[var(--card-bg)] shadow-md ring-1 ring-[var(--card-border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--card-accent)]"
    >
      {/* ── Image area ── */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-[var(--card-accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-base font-bold leading-snug text-[var(--card-text)] transition-colors duration-200 group-hover:text-[var(--card-accent)]">
          {title}
        </h2>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--card-muted)]">
          {description}
        </p>

        {/* Date */}
        {date && (
          <p className="mt-auto text-xs font-medium text-[var(--card-muted)] opacity-70">
            {date}
          </p>
        )}
      </div>

      {/* ── Bottom accent line (reveals on hover) ── */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--card-accent)] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
