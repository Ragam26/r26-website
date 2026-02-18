/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { LOOPS_CONFIG, LOOPS_CONFIG_MOBILE } from "./loopsConfig";
import Loader from "@/components/common/Loader";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_HEIGHT = "373vh";
const LOOP_EXIT_SCALE = 18;
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
  const loaderRef = useRef(null);
  const [leftDancer] = useState(() => Math.floor(Math.random() * 3) + 1);
  const [rightDancer] = useState(() => Math.floor(Math.random() * 3) + 1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // setect screen size
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // check immediately
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const LOGO_MAX_SCALE = isMobile ? 1.67 : 2.15;
  const activeLoops = isMobile ? LOOPS_CONFIG_MOBILE : LOOPS_CONFIG;

  useLayoutEffect(() => {
    if (!isMounted) return;

    // ;ock scroll during the intro animation
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const navbar = document.getElementById("global-navbar");
      // INFINITE SPIN
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

      // INTRO SEQUENCE
      const introTl = gsap.timeline({
        onComplete: () => {
          // unlock scroll once the logo and loops are settled
          document.body.style.overflow = "auto";
        },
      });

      const START_LOGO_SCALE = isMobile ? 1.2 : 0.8;

      // 1. Initial Setups
      // set textRef opacity to 1 immediately so it's ready,
      // but we hide it using clipPath so it's invisible
      gsap.set([logoWhiteRef.current, logoRef.current, textRef.current], {
        opacity: 0,
        scale: START_LOGO_SCALE,
      });
      if(navbar) {
        gsap.set(navbar, {
          opacity: 0,
          y: -40,
          pointerEvents: "none",
        });
      }
      gsap.set(loopsRef.current, { opacity: 0, scale: 1.2 });

      // Dancers start at 0 opacity and clipped shut
      gsap.set(dancerContainerRef.current, {
        opacity: 0,
        clipPath: MASK_CLOSED,
      });

      // Set the "Closed" Clip Path state
      gsap.set(textRef.current, {
        opacity: 1,
        clipPath: "polygon(0% 0%, 0% 0%, -20% 100%, -20% 100%)",
      });

      // fade out loader
      introTl.to(".loader-container", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => setShowLoader(false),
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
      // animate textRef scale here too so it matches the logo perfectly
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

      // call infinite rotation logic mid-intro
      introTl.call(() => spinTl.play(), null, "-=0.9");

      // BREATHING GLOW EFFECT
      gsap.set(logoRef.current, {
        filter:
          "drop-shadow(0 0 5px rgba(220, 38, 38, 0.8)) drop-shadow(0 0 10px rgba(220, 38, 38, 0.4))",
      });

      // BREATHING TIMELINE
      const glowTl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true, //
      });

      glowTl.to(logoRef.current, {
        filter:
          "drop-shadow(0 0 9px rgba(220, 38, 38, 0.9)) " +
          "drop-shadow(0 0 14px rgba(220, 38, 38, 0.6))",
        duration: 1.5,
        ease: "sine.inOut",
      });

      // SCROLL TIMELINE
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: "landing-scroll",
          trigger: outerContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress >= 0.25) {
              if (glowTl.paused()) glowTl.play();
            }
          },
        },
      });

      // 1. LOGO & TEXT SCALING
      scrollTl.fromTo(
        [logoRef.current, textRef.current],
        { scale: 1 },
        {
          scale: LOGO_MAX_SCALE,
          ease: "power1.out",
          force3D: true,
          duration: 0.4,
          immediateRender: false,
        },
        0,
      );

      // 2. TEXT REVEAL (Angled Wipe)
      scrollTl.fromTo(
        textRef.current,
        { clipPath: MASK_CLOSED },
        {
          clipPath: MASK_OPEN,
          ease: "power2.inOut",
          duration: 0.5,
        },
        TEXT_REVEAL_START,
      );

      if(navbar) {
        // NAVBAR APPEAR
        scrollTl.to(
          navbar, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
            pointerEvents: "auto",
          },
          TEXT_REVEAL_START + 0.1,
        );
      }

      // 3. DANCER REVEAL
      scrollTl.fromTo(
        dancerContainerRef.current,
        { clipPath: MASK_CLOSED },
        {
          clipPath: MASK_OPEN,
          ease: "power2.out",
          duration: 0.4,
        },
        DANCER_REVEAL_START,
      );

      // 4. LOOPS SCALING & FADE
      scrollTl.fromTo(
        loopsRef.current,
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: LOOP_EXIT_SCALE,
          opacity: 0,
          ease: "none",
          force3D: true,
          duration: 0.9,
          immediateRender: false,
        },
        0,
      );
    }, outerContainerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [isMounted, isMobile, activeLoops, LOGO_MAX_SCALE]);

  return (
    <div
      ref={outerContainerRef}
      style={{ height: SCROLL_HEIGHT }}
      className="bg-black"
    >
      {showLoader && (
        <div className="loader-container fixed inset-0 z-9999">
          <Loader />
        </div>
      )}

      <main
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-white"
      >
        <div className="absolute inset-0 z-5 opacity-100 pointer-events-none mix-blend-overlay">
          <Image
            src="/images/landingAnimation/heroBgOverlay.png"
            alt="Texture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Render loops */}
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

        {/* White Logo */}
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

        {/* Red Logo */}
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
          {/* Left Dancer */}
          <div className="absolute top-2 left-12 w-full h-[50vh] md:top-auto md:bottom-3 md:-left-25 md:h-screen md:w-auto overflow-visible">
            <img
              src={`/images/landingAnimation/dancers/dancerLeft${leftDancer}.png`}
              alt="Dancer L"
              className="h-full w-full object-contain object-bottom scale-[1.7] origin-bottom md:scale-100 md:object-bottom-left mix-blend-screen opacity-90"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>

          {/* Right Dancer */}
          <div className="absolute -bottom-7 right-14 w-full h-[50vh] md:-right-25 md:h-screen md:w-auto overflow-visible">
            <img
              src={`/images/landingAnimation/dancers/dancerRight${rightDancer}.png`}
              alt="Dancer R"
              className="h-full w-full object-contain object-bottom scale-[1.7] origin-bottom md:scale-100 md:object-bottom-right mix-blend-screen opacity-90"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
