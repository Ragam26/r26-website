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
    <div className="relative w-full bg-[#680B1D]" ref={container}>
      <div className="hidden md:block absolute inset-y-0 left-[92.8%] w-full z-50 pointer-events-none select-none">
        <div className="sticky top-0 h-screen">
          <Image
            src="/images/debate/borderRight.png"
            alt=""
            width={80}
            height={1080}
            className="h-screen w-auto object-cover"
            priority
          />
        </div>
      </div>

      <div className="hidden md:block absolute inset-y-0 right-0 w-full z-50 pointer-events-none select-none">
        <div className="sticky top-0 h-screen">
          <Image
            src="/images/debate/borderLeft.png"
            alt=""
            width={80}
            height={1080}
            className="h-screen w-auto object-cover"
            priority
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
        prizeCardInnerRefs={prizeCardInnerRefs}
      />
      <DetailsSection />
    </div>
  );
}
