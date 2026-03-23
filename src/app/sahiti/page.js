"use client";
import { useRef } from "react";
import HeroSection from "./HeroSection";
import PrizesSection from "./PrizesSection";
import DetailsSection from "./DetailsSection";
import useDebateAnimations from "./useDebateAnimations";

export default function Home() {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);
  const panelTitleRef = useRef(null);
  const prizeCardInnerRefs = useRef([]);
  const prizeScrollRef = useRef(null);
  const prizeTitleRef = useRef(null);

  useDebateAnimations({
    container,
    cardRefs,
    titleRef,
    panelTitleRef,
    prizeCardInnerRefs,
    prizeScrollRef,
    prizeTitleRef,
  });

  return (
    <div className="relative w-full bg-[#680B1D]" ref={container}>
      <div className="hidden md:block absolute inset-y-0 left-[92.8%] w-full z-50 pointer-events-none select-none">
        <div className="sticky top-0 h-screen">
          <div
            className="h-screen w-24"
            style={{
              backgroundColor: "#BA9B64",
              maskImage: "url('https://cdn.ragam.co.in/debate/borderRight.png')",
              WebkitMaskImage: "url('https://cdn.ragam.co.in/debate/borderRight.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      <div className="hidden md:block absolute inset-y-0 right-0 w-full z-50 pointer-events-none select-none">
        <div className="sticky top-0 h-screen">
          <div
            className="h-screen w-24"
            style={{
              backgroundColor: "#BA9B64",
              maskImage: "url('https://cdn.ragam.co.in/debate/borderLeft.png')",
              WebkitMaskImage: "url('https://cdn.ragam.co.in/debate/borderLeft.png')",
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      </div>

      <HeroSection
        titleRef={titleRef}
        panelTitleRef={panelTitleRef}
        cardRefs={cardRefs}
        stickyRef={stickyRef}
      />
      <PrizesSection
        prizeScrollRef={prizeScrollRef}
        prizeTitleRef={prizeTitleRef}
        prizeCardInnerRefs={prizeCardInnerRefs}
      />
      <DetailsSection />
    </div>
  );
}
