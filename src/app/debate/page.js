"use client";
import { useEffect, useRef } from "react";
import AdjCard from "../../components/debate/AdjCard";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { archivo, instrument } from "@/lib/fonts";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const stickyRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
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
        y: 40,
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
            {/* subtitle above — left aligned */}
            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-start -mb-7`}
            >
              Ragam <span className="text-[#D4AF37]">X</span> Literary and
              Debating Club NITC presents
            </p>

            {/* main title */}
            <h1
              className={`${archivo.className} text-white text-center text-[12vw] font-light leading-none`}
            >
              SAMVADAM
            </h1>

            {/* subtitle below — right aligned */}
            <p
              className={`${instrument.className} text-white text-[2vw] font-light self-end -mt-7`}
            >
              Asian Parliamentary Debate
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

      <section className="relative w-screen h-screen footer">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[5vw] font-light leading-none">
          Footer or Upcoming Section
        </h1>
      </section>
    </div>
  );
}
