"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
    >
      <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
    </ReactLenis>
  );
}
