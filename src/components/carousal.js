"use client";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import ProshowCard from "@/components/proshowCard";

export default function FocusCarousel({ items = [] }) {
  const containerRef = useRef(null);
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

  const handlePrev = () => {
    if (active > 0) handleCardClick(active - 1);
  };
  const handleNext = () => {
    if (active < items.length - 1) handleCardClick(active + 1);
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
    <div className="relative w-full">

      {/* LEFT BUTTON */}
      <button
        onClick={handlePrev}
        disabled={active === 0}
        className="absolute left-2 top-[30vw] -translate-y-1/2 z-20
                   w-15 h-15 flex items-center justify-center rounded-full
                   bg-white/10 hover:bg-white hover:text-black border border-white/20
                   backdrop-blur-sm text-white text-xl
                   disabled:opacity-20 disabled:hidden
                   transition-all duration-200"
      >
        ‹
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={handleNext}
        disabled={active === items.length - 1}
        className="absolute right-2 top-[30vw] -translate-y-1/2 z-20
                   w-15 h-15 flex items-center justify-center rounded-full
                   bg-white/2 hover:bg-white hover:text-black border border-white/20
                   backdrop-blur-sm text-white text-xl
                   disabled:opacity-20 disabled:hidden
                   transition-all duration-200"
      >
        ›
      </button>

      {/* overflow-hidden scoped only to scroll track so buttons aren't clipped */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Left Spacer */}
          <div style={{ minWidth: spacer }} className="shrink-0" />

          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <div
                key={item.id ?? i}
                data-card
                onClick={() => handleCardClick(i)}
                className="shrink-0 w-[60vw] snap-center transition-all duration-500 ease-out flex flex-col items-center"
              >
                <ProshowCard {...item} />
                <div
                  className="scale-y-[-1] opacity-20 mt-2 pointer-events-none"
                  style={{
                    filter: "url(#water-ripple) blur(2px)",
                    maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
                    WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)",
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

    </div>
  );
}