/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

// --- CONFIGURATION ---
// Add as many loops as you want here.
// width: Using vmin ensures it scales with viewport
// duration: Time for one full rotation (seconds)
// direction: 1 for clockwise, -1 for counter-clockwise
const LOOPS_CONFIG = [
  {
    id: "8",
    src: "loopM.svg",
    width: "210vmin",
    zIndex: 20,
    duration: 55,
    direction: -1,
  },
  {
    id: "7",
    src: "loopS.svg",
    width: "170vmin",
    zIndex: 30,
    duration: 50,
    direction: 1,
  },
  {
    id: "6",
    src: "loopL.svg",
    width: "126vmin",
    zIndex: 10,
    duration: 45,
    direction: -1,
  },
  {
    id: "5",
    src: "loopM.svg",
    width: "92vmin",
    zIndex: 20,
    duration: 40,
    direction: 1,
  },
  {
    id: "4",
    src: "loopS.svg",
    width: "74vmin",
    zIndex: 30,
    duration: 35,
    direction: -1,
  },
  {
    id: "3",
    src: "loopL.svg",
    width: "55vmin",
    zIndex: 10,
    duration: 30,
    direction: 1,
  },
  {
    id: "2",
    src: "loopM.svg",
    width: "40vmin",
    zIndex: 20,
    duration: 25,
    direction: -1,
  },
  {
    id: "1",
    src: "loopS.svg",
    width: "30vmin",
    zIndex: 30,
    duration: 20,
    direction: 1,
  },
];

export default function LandingPage() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  // A single ref array to hold all loop DOM elements
  const loopsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Loop through our config to create animations dynamically
      LOOPS_CONFIG.forEach((loop, index) => {
        const element = loopsRef.current[index];

        if (element) {
          tl.to(
            element,
            {
              rotation: 360 * loop.direction, // 360 or -360
              duration: loop.duration,
              repeat: -1,
              ease: "none",
            },
            0, // Start all at time 0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* --- BACKGROUND OVERLAY --- */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src="/images/landingAnimation/heroBgOverlay.png"
          alt="Texture"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* --- DYNAMIC LOOPS RENDERER --- */}
      {LOOPS_CONFIG.map((loop, index) => (
        <div
          key={loop.id}
          // Store the DOM element in our refs array at the specific index
          ref={(el) => (loopsRef.current[index] = el)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: loop.width, // Apply specific width
            zIndex: loop.zIndex, // Apply layering
          }}
        >
          <img
            src={`/images/landingAnimation/${loop.src}`}
            alt={`Loop ${loop.id}`}
            className="h-full w-full"
          />
        </div>
      ))}

      {/* --- CENTER LOGO --- */}
      <div
        ref={logoRef}
        className="relative z-[100] h-auto w-[12vmin] -translate-y-1.5"
      >
        <img
          src="/images/landingAnimation/ragamLogoWhite.svg"
          alt="Ragam Logo"
          className="h-full w-full object-contain"
        />
      </div>
    </main>
  );
}
