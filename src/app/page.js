"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/components/common/SmoothScroll";
import PolaroidPage from "../pageComponents/polaroid/page";
import LandingPage from "@/pageComponents/landing/LandingPage";
import Legacy from "@/pageComponents/legacy/Legacy";
import ProshowSection from "@/pageComponents/proshow/proshow";
import ProgramCarousel from "@/pageComponents/carousel/ProgramCarousel";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef?.current?.lenis;
    if (!lenis) return;

    if (!introComplete) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [introComplete, lenisRef]);

  return (
    <>
      <LandingPage onIntroComplete={() => setIntroComplete(true)} />
      <PolaroidPage />
      <ProgramCarousel />
      <ProshowSection />
      <Legacy />
    </>
  );
}
