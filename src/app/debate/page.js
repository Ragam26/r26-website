"use client";
import { useRef } from "react";
import Image from "next/image";
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
      <div className="fixed left-0 top-0 h-screen z-50 pointer-events-none select-none">
        <Image
          src="/images/debate/borderLeft.png"
          alt=""
          width={80}
          height={1080}
          className="h-screen w-auto object-cover"
          priority
        />
      </div>
      <div className="fixed right-0 top-0 h-screen z-50 pointer-events-none select-none">
        <Image
          src="/images/debate/borderRight.png"
          alt=""
          width={80}
          height={1080}
          className="h-screen w-auto object-cover"
          priority
        />
      </div>

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
      <DetailsSection />
    </div>
  );
}
