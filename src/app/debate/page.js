"use client";
import { useEffect, useRef } from "react";
import AdjCard from "../../components/debate/AdjCard";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { archivo, instrument, impact } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);
  const panelTitleRef = useRef(null);
  const prizeCardInnerRefs = useRef([]);
  const prizeScrollRef = useRef(null);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 2.7;
      const positions = [30, 50, 70];
      const rotations = [-17, 0, 17];

      // scroll title upward across the full scroll duration
      gsap.to(titleRef.current, {
        yPercent: -380,
        ease: "none",
        scrollTrigger: {
          trigger: container.current.querySelector(".scroll-track"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
        },
      });

      gsap.to(container.current.querySelector(".cards"), {
        y: "12%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current.querySelector(".scroll-track"),
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 1,
        },
      });

      // spread cards
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".scroll-track"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // scroll "Core Adjudication Panel" label up during the flip phase
      // flip starts at 1/3 of totalScrollHeight (~100vh) and ends at ~2/3 (~200vh)
      gsap.fromTo(
        panelTitleRef.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".scroll-track"),
            start: () => `top+=${window.innerHeight} top`,
            end: () => `top+=${window.innerHeight * 1.9} top`,
            scrub: 1,
          },
        },
      );

      // flip cards
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: container.current.querySelector(".scroll-track"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
      // flip prize cards — scrubbed, fully reversible
      prizeCardInnerRefs.current.forEach((inner, i) => {
        if (!inner) return;
        gsap.fromTo(
          inner,
          { rotateY: 0 },
          {
            rotateY: 180,
            ease: "none",
            scrollTrigger: {
              trigger: prizeScrollRef.current,
              start: () => `top+=${window.innerHeight * (0.4 + i * 0.2)} top`,
              end: () => `top+=${window.innerHeight * (0.9 + i * 0.2)} top`,
              scrub: 1,
              id: `prize-flip-${i}`,
            },
          },
        );
      });
    },
    { scope: container },
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full bg-[#680B1D]" ref={container}>
      <div className="scroll-track relative" style={{ height: "400vh" }}>
        <div
          className="sticky top-0 w-screen h-screen overflow-hidden"
          ref={stickyRef}
        >
          {/* title behind cards — starts centered, scrolls upward */}
          <div
            ref={titleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[75%] z-0 select-none pointer-events-none flex flex-col items-center"
          >
            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-start -mb-7`}
            >
              Ragam <span className="text-[#D4AF37]">X</span> Literary and
              Debating Club NITC presents
            </p>

            <h1
              className={`${archivo.className} text-white text-center text-[14vw] font-light leading-none`}
            >
              SAHITI
            </h1>

            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-end -mt-7`}
            >
              Asian Parliamentary Debate
            </p>
          </div>

          {/* Core Adjudication Panel label — rises up during flip, sits under cards */}
          <div
            ref={panelTitleRef}
            className="absolute top-[20%] left-1/2 -translate-x-1/2 z-5 select-none pointer-events-none text-center w-full"
          >
            <p
              className={`${instrument.className}  text-white text-[4.5vw] font-medium tracking-normal `}
            >
              Core Adjudication Panel
            </p>
          </div>

          {/* cards on top — initial position slightly lower */}
          <div className="cards relative w-full h-full z-10 translate-y-65">
            {" "}
            {[...Array(3)].map((_, index) => (
              <AdjCard
                key={index}
                id={`card-${index + 1}`}
                frontAlt="Card Image"
                backText="Your card details appear here"
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prizes section — scroll-track gives canvas for staggered flip */}
      <section className="relative w-screen">
        <div
          ref={prizeScrollRef}
          className="prizes-scroll-track relative"
          style={{ height: "250vh" }}
        >
          <div className="sticky top-0 w-screen h-screen overflow-hidden">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{ backgroundImage: "url('/images/debate/prizesBg.png')" }}
            />

            {/* Vignette 1 — all edges */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to bottom, #680B1D 0%, transparent 25%),
                  linear-gradient(to top,    #680B1D 0%, transparent 25%),
                  linear-gradient(to right,  #680B1D 0%, transparent 20%),
                  linear-gradient(to left,   #680B1D 0%, transparent 20%)
                `,
              }}
            />

            {/* Trophy — behind cards, above all-edge vignette */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <Image
                src="/images/debate/trophy.png"
                alt="Trophy"
                fill
                className="object-contain"
              />
            </div>

            {/* Vignette 2 — bottom edge only */}
            <div
              className="absolute inset-0 z-30 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, #680B1D 0%, transparent 33%)",
              }}
            />

            {/* PRIZES title — above vignettes */}
            <h1
              className={`${impact.className} absolute top-[4%] left-1/2 -translate-x-1/2 z-40 text-white text-center text-[20vw] font-light leading-none select-none pointer-events-none whitespace-nowrap`}
            >
              PRIZES
            </h1>

            {/* Prize cards — 4 cards, staggered up/down, bob + scroll-flip */}
            <div
              className="absolute inset-x-0 z-50 flex flex-row items-center justify-center gap-16"
              style={{ top: "46%" }}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="prize-card-bob w-50 h-75 perspective-[1000px] shrink-0"
                  style={{
                    marginTop: i % 2 === 0 ? "-5vh" : "5vh",
                    animationDelay: `${i % 2 === 0 ? 0 : -1.25}s`,
                  }}
                >
                  <div
                    className="relative w-full h-full transform-3d"
                    ref={(el) => (prizeCardInnerRefs.current[i] = el)}
                  >
                    {/* Front — card back image, shown first */}
                    <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden">
                      <Image
                        src="/images/debate/playingCardBack.png"
                        alt="prize card"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Back — white content, revealed on scroll */}
                    <div className="absolute w-full h-full backface-hidden rounded-[0.8em] overflow-hidden bg-white transform-[rotateY(180deg)] p-4 flex items-center justify-center">
                      <p className="text-black text-center text-base font-bold">
                        Prize {i + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
