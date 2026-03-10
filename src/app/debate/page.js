"use client";
import { useRef } from "react";
import HeroSection from "./HeroSection";
import PrizesSection from "./PrizesSection";
import useDebateAnimations from "./useDebateAnimations";

export default function Home() {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);
  const panelTitleRef = useRef(null);
  const prizeCardInnerRefs = useRef([]);
  const prizeScrollRef = useRef(null);

  useDebateAnimations({
    container,
    cardRefs,
    titleRef,
    panelTitleRef,
    prizeCardInnerRefs,
    prizeScrollRef,
  });

  return (
    <div className="w-full bg-[#680B1D]" ref={container}>
      <HeroSection
        titleRef={titleRef}
        panelTitleRef={panelTitleRef}
        cardRefs={cardRefs}
        stickyRef={stickyRef}
      />
      <PrizesSection
        prizeScrollRef={prizeScrollRef}
        prizeCardInnerRefs={prizeCardInnerRefs}
      />
    </div>
  );
}
