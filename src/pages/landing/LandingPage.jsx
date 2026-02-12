/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// --- CURRENT CONFIGURATION VALUES ---
const SCROLL_HEIGHT = "373vh"; // Total height of the scrollable container
const LOGO_MAX_SCALE = 2.15; // Final scale for the Red Logo (2.15x)
const LOOP_EXIT_SCALE = 18; // Final scale for the loops as they exit (18x)
const TUNNEL_EASE = "none"; // Linear scaling for the tunnel effect
const TEXT_REVEAL_START = 0.2;

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
    width: "171vmin",
    zIndex: 30,
    duration: 50,
    direction: 1,
  },
  {
    id: "6",
    src: "loopL.svg",
    width: "128vmin",
    zIndex: 10,
    duration: 45,
    direction: -1,
  },
  {
    id: "5",
    src: "loopM.svg",
    width: "94vmin",
    zIndex: 20,
    duration: 40,
    direction: 1,
  },
  {
    id: "4",
    src: "loopS.svg",
    width: "75vmin",
    zIndex: 30,
    duration: 35,
    direction: -1,
  },
  {
    id: "3",
    src: "loopL.svg",
    width: "56vmin",
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
  const outerContainerRef = useRef(null);
  const stickyRef = useRef(null);
  const logoWhiteRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const loopsRef = useRef([]);

  useLayoutEffect(() => {
    // Lock scroll during the intro animation
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      // --- PART A: THE INFINITE SPIN (Continuous Rotation) ---
      const spinTl = gsap.timeline({ paused: true });
      LOOPS_CONFIG.forEach((loop, index) => {
        const element = loopsRef.current[index];
        if (element) {
          spinTl.to(
            element,
            {
              rotation: 360 * loop.direction,
              duration: loop.duration,
              repeat: -1,
              ease: "none",
            },
            0,
          );
        }
      });

      // --- PART B: THE INTRO SEQUENCE (Blink -> Cascade -> Red Logo) ---
      const introTl = gsap.timeline({
        onComplete: () => {
          // Unlock scroll once the logo and loops are settled
          document.body.style.overflow = "auto";
        },
      });

      // 1. Initial Setups
      // Note: We set textRef opacity to 1 immediately so it's "ready",
      // but we hide it using clipPath so it's invisible to the eye.
      gsap.set([logoWhiteRef.current, logoRef.current, textRef.current], {
        opacity: 0,
        scale: 0.8,
      });
      gsap.set(loopsRef.current, { opacity: 0, scale: 1.2 });

      // Set the "Closed" Clip Path state (Hidden on the left with angle)
      gsap.set(textRef.current, {
        opacity: 1, // It's "there" but clipped
        clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)",
      });

      // 2. White Logo Blink
      introTl.to(logoWhiteRef.current, {
        opacity: 1,
        duration: 0.15,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 3. Loops Cascade
      introTl.to(
        loopsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "+=0.2",
      );

      // 4. Red Logo Entry (Locked with Text Scaling)
      // We animate textRef scale here too, so it matches the logo perfectly
      // even though it's still invisible (clipped).
      introTl.to(
        [logoRef.current, textRef.current],
        {
          opacity: 1, // Logo fades in, Text fades in (but is still clipped hidden)
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      );

      // Start the infinite rotation logic mid-intro
      introTl.call(() => spinTl.play(), null, "-=0.9");

      // --- BREATHING GLOW EFFECT ---
      // This is the looping animation that will be triggered by the scroll
      gsap.set(logoRef.current, {
        filter:
          "drop-shadow(0 0 5px rgba(220, 38, 38, 0.8)) drop-shadow(0 0 10px rgba(220, 38, 38, 0.4))",
      });

      // --- THE MODULAR BREATHING TIMELINE ---
      const glowTl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true, // This creates the "breath in / breath out" loop
      });

      glowTl.to(logoRef.current, {
        // The "Maximum" state of the breath
        filter:
          "drop-shadow(0 0 9px rgba(220, 38, 38, 0.9)) " + // Tighter core gets slightly wider
          "drop-shadow(0 0 14px rgba(220, 38, 38, 0.6))", // Outer aura expands significantly
        duration: 1.5,
        ease: "sine.inOut",
      });

      // --- PART C: THE TUNNEL SCROLL ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: outerContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Trigger glow at 25% scroll progress (0.25)
            if (self.progress >= 0.25) {
              if (glowTl.paused()) glowTl.play();
            }
          },
        },
      });

      // 1. LOGO SCALING and text scaling
      // The Red Logo reaches 2.15x scale at 40% (duration 0.4) of the scroll area
      scrollTl.to(
        [logoRef.current, textRef.current],
        {
          scale: LOGO_MAX_SCALE,
          ease: "power1.out",
          force3D: true,
          duration: 0.4,
        },
        0,
      );

      // 2. TEXT REVEAL (Angled Wipe)
      // Starts at TEXT_REVEAL_START (0.2)
      scrollTl.to(
        textRef.current,
        {
          // We move the right-hand points of the polygon across the screen
          // effectively "wiping" the text into existence.
          clipPath: "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)",
          ease: "power2.inOut",
          duration: 0.5, // Quick swipe
        },
        TEXT_REVEAL_START,
      );

      // 3. LOOPS SCALING
      // All loops scale to 18x and fade out over 90% (duration 0.9) of the scroll area
      scrollTl.to(
        loopsRef.current,
        {
          scale: LOOP_EXIT_SCALE,
          opacity: 0,
          ease: "none",
          force3D: true,
          duration: 0.9,
        },
        0,
      );
    }, outerContainerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      ref={outerContainerRef}
      style={{ height: SCROLL_HEIGHT }}
      className="bg-black"
    >
      {/* Sticky container that keeps visual elements centered during scroll */}
      <main
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <Image
            src="/images/landingAnimation/heroBgOverlay.png"
            alt="Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Render loops from LOOPS_CONFIG array */}
        {LOOPS_CONFIG.map((loop, index) => (
          <div
            key={loop.id}
            ref={(el) => (loopsRef.current[index] = el)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform"
            style={{ width: loop.width, zIndex: loop.zIndex }}
          >
            <img
              src={`/images/landingAnimation/${loop.src}`}
              alt="Loop"
              className="h-full w-full"
            />
          </div>
        ))}

        {/* Initial White Logo (Z-index 101 to stay on top of red if needed) */}
        <div
          ref={logoWhiteRef}
          className="pointer-events-none absolute left-1/2 top-1/2 z-101 h-auto w-[12vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <img
            src="/images/landingAnimation/ragamLogoWhite.svg"
            alt="White Logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Final Red Logo (Z-index 100) */}
        <div
          ref={logoRef}
          className="absolute left-1/2 top-1/2 z-100 h-auto w-[44vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <img
            src="/images/landingAnimation/ragamLogo.svg"
            alt="Red Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div
          ref={textRef}
          className="absolute left-1/2 top-1/2 z-102 h-auto w-[44vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <img
            src="/images/landingAnimation/ragamText.svg"
            alt="Ragam 2026"
            className="h-full w-full object-contain"
          />
        </div>
      </main>
    </div>
  );
}
