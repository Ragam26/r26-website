/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { LOOPS_CONFIG, LOOPS_CONFIG_MOBILE } from "./loopsConfig";

gsap.registerPlugin(ScrollTrigger);

// --- CURRENT CONFIGURATION VALUES ---
const SCROLL_HEIGHT = "373vh"; // Total height of the scrollable container
const LOOP_EXIT_SCALE = 18; // Final scale for the loops as they exit (18x)
const TEXT_REVEAL_START = 0.2;
const DANCER_REVEAL_START = 0.55;

const MASK_CLOSED = "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)";
const MASK_OPEN = "polygon(0% 0%, 120% 0%, 100% 100%, -20% 100%)";

export default function LandingPage() {
  const outerContainerRef = useRef(null);
  const stickyRef = useRef(null);
  const logoWhiteRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const loopsRef = useRef([]);
  const dancerContainerRef = useRef(null);
  const [leftDancer] = useState(() => Math.floor(Math.random() * 3) + 1);
  const [rightDancer] = useState(() => Math.floor(Math.random() * 3) + 1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // setect screen size
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const LOGO_MAX_SCALE = isMobile ? 1.67 : 2.15;
  const activeLoops = isMobile ? LOOPS_CONFIG_MOBILE : LOOPS_CONFIG;

  useLayoutEffect(() => {
    if (!isMounted) return;

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

      const START_LOGO_SCALE = isMobile ? 1.2 : 0.8;

      // 1. Initial Setups
      // Note: We set textRef opacity to 1 immediately so it's "ready",
      // but we hide it using clipPath so it's invisible to the eye.
      gsap.set([logoWhiteRef.current, logoRef.current, textRef.current], {
        opacity: 0,
        scale: START_LOGO_SCALE,
      });
      gsap.set(loopsRef.current, { opacity: 0, scale: 1.2 });

      // Dancers start at 0 opacity and clipped shut
      gsap.set(dancerContainerRef.current, {
        opacity: 0,
        clipPath: MASK_CLOSED,
      });

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
        [logoRef.current, textRef.current, dancerContainerRef.current],
        {
          opacity: 1,
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
          immediateRender: false,
          overwrite: "auto",
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
          immediateRender: false,
          overwrite: "auto",
        },
        TEXT_REVEAL_START,
      );

      // Dancer Reveal (Mask 2 - 110 degree slant)
      // Starts at 0.6 (Text is at 80% completion)
      scrollTl.to(
        dancerContainerRef.current,
        {
          clipPath: MASK_OPEN,
          ease: "power2.out",
          duration: 0.4,
          immediateRender: false,
          overwrite: "auto",
        },
        DANCER_REVEAL_START,
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
          immediateRender: false,
          overwrite: "auto",
        },
        0,
      );
    }, outerContainerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [isMounted, isMobile, activeLoops]);

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
        {/* GRAIN TEXTURE OVERLAY 
           - z-[5]: Higher than background, lower than loops (z-10).
           - mix-blend-overlay: Makes it look like texture/grain on the black.
        */}
        <div className="absolute inset-0 z-5 opacity-100 pointer-events-none mix-blend-overlay">
          <Image
            src="/images/landingAnimation/heroBgOverlay.png"
            alt="Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Render loops (Starts at z-10, so they float ABOVE the grain) */}
        {activeLoops.map((loop, index) => (
          <div
            key={loop.id}
            ref={(el) => (loopsRef.current[index] = el)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform"
            style={{
              width: loop.width,
              zIndex: loop.zIndex,
              aspectRatio: "1/1",
              marginTop: "8px",
              marginLeft: "-5px",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('/images/landingAnimation/loops/gradient.png')`,
                backgroundSize: "135% 135%",
                backgroundPosition: "center",
                WebkitMaskImage: `url('/images/landingAnimation/${loop.src}')`,
                maskImage: `url('/images/landingAnimation/${loop.src}')`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
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
          className="absolute left-1/2 top-1/2 z-100 h-auto w-[64vmin] md:w-[44vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <img
            src="/images/landingAnimation/ragamLogo.svg"
            alt="Red Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div
          ref={textRef}
          className="absolute left-1/2 top-1/2 z-102 h-auto w-[64vmin] md:w-[44vmin] -translate-x-1/2 -translate-y-1/2 opacity-0 will-change-transform"
        >
          <img
            src="/images/landingAnimation/ragamText.svg"
            alt="Ragam 2026"
            className="h-full w-full object-contain"
          />
        </div>

        <div
          ref={dancerContainerRef}
          className="absolute inset-0 z-4 pointer-events-none"
        >
          {/* Left Dancer: Top 50% on mobile */}
          <div className="absolute top-2 left-12 w-full h-[50vh] md:top-auto md:bottom-3 md:-left-25 md:h-screen md:w-auto overflow-visible">
            <img
              src={`/images/landingAnimation/dancers/dancerLeft${leftDancer}.png`}
              alt="Dancer L"
              className="h-full w-full object-contain object-bottom scale-[1.7] origin-bottom md:scale-100 md:object-bottom-left mix-blend-screen opacity-90"
            />
          </div>

          {/* Right Dancer: Bottom 50% on mobile */}
          <div className="absolute -bottom-7 right-14 w-full h-[50vh] md:-right-25 md:h-screen md:w-auto overflow-visible">
            <img
              src={`/images/landingAnimation/dancers/dancerRight${rightDancer}.png`}
              alt="Dancer R"
              className="h-full w-full object-contain object-bottom scale-[1.7] origin-bottom md:scale-100 md:object-bottom-right mix-blend-screen opacity-90"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
