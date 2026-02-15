"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import ProshowCard from "@/components/proshowCard";

export default function FocusCarousel({ items = [] }) {
  const containerRef = useRef(null);
  // Start active state at the middle card (index 1 for 3 items)
  const [active, setActive] = useState(Math.floor(items.length / 2));
  const [spacer, setSpacer] = useState(0);

  const handleCardClick = (index) => {
    const el = containerRef.current;
    if (!el) return;

    const children = Array.from(el.children);
    const target = children[index + 1];

    if (target) {
      el.scrollTo({
        left: target.offsetLeft - spacer,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateLayout = () => {
      const firstCard = el.querySelector("[data-card]");
      if (!firstCard) return;

      const containerWidth = el.clientWidth;
      const cardWidth = firstCard.clientWidth;
      const newSpacer = containerWidth / 2 - cardWidth / 2;
      setSpacer(newSpacer);

      const children = Array.from(el.children);
      const target = children[active + 1];
      if (target) {
        el.scrollTo({
          left: target.offsetLeft - newSpacer,
          behavior: "instant",
        });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [active]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const children = Array.from(el.children).slice(1, -1);
      const containerCenter = el.scrollLeft + el.clientWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(containerCenter - childCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Lelt Spacer */}
        <div style={{ minWidth: spacer }} className="shrink-0" />

        {items.map((item, i) => {
          const isActive = i === active;

          return (
            <div
              key={item.id ?? i}
              data-card
              onClick={() => handleCardClick(i)}
              className="shrink-0 w-[60vw] snap-center transition-all duration-500 ease-out flex flex-col items-center"
              style={{
                transform: `scale(${isActive ? 0.88 : 0.67})`,
                filter: `brightness(${isActive ? 1 : 0.4})`,
                zIndex: isActive ? 10 : 1,
              }}
            >
              <ProshowCard {...item} />

              {/* Reflection matching the smaller scale */}
              <div
                className="scale-y-[-1] opacity-20 mt-2 pointer-events-none"
                style={{
                  filter: "url(#water-ripple) blur(2px)",
                  maskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
                  WebkitMaskImage:
                    "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
                }}
              >
                <ProshowCard {...item} />
              </div>
            </div>
          );
        })}

        {/* Right Spacer */}
        <div style={{ minWidth: spacer }} className="shrink-0" />
      </div>
    </div>
  );
}
