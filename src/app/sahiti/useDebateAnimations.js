"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function useDebateAnimations({
  container,
  cardRefs,
  titleRef,
  panelTitleRef,
  prizeCardInnerRefs,
  prizeScrollRef,
  prizeTitleRef,
}) {
  useGSAP(
    () => {
      const cards = cardRefs.current;
      const isMobile = window.innerWidth < 768;
      const totalScrollHeight = window.innerHeight * (isMobile ? 1.7 : 2.7);
      const positions = isMobile ? [27, 73, 50] : [30, 50, 70];
      const rotations = isMobile ? [-17, 17, 0] : [-17, 0, 17];
      const initialPositions = [44, 50, 56];
      const initialRotations = [-7, 0, 7];
      // mobile: 2 rows — top row (cards 0,1) and bottom row (card 2)
      const mobileTopInitial = ["48%", "48%", "48%"];
      const mobileTopFinal = ["36%", "36%", "64%"];

      // scroll title upward across the full scroll duration
      gsap.to(titleRef.current, {
        yPercent: isMobile ? -250 : -380,
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
        const fromProps = {
          left: `${initialPositions[index]}%`,
          rotation: initialRotations[index],
        };
        const toProps = {
          left: `${positions[index]}%`,
          rotation: rotations[index],
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".scroll-track"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        };
        if (isMobile) {
          fromProps.top = mobileTopInitial[index];
          toProps.top = mobileTopFinal[index];
        }
        gsap.fromTo(card, fromProps, toProps);
      });

      // scroll "Core Adjudication Panel" label up during the flip phase
      gsap.fromTo(
        panelTitleRef.current,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".scroll-track"),
            start: () =>
              `top+=${window.innerHeight * (isMobile ? 0.85 : 1)} top`,
            end: () =>
              `top+=${window.innerHeight * (isMobile ? 1.4 : 1.9)} top`,
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

      // animate prizes title — same length as panelTitleRef, starts early
      gsap.fromTo(
        prizeTitleRef.current,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: prizeScrollRef.current,
            start: "top 120%",
            end: "top 60%",
            scrub: 0.3,
          },
        },
      );

      // flip prize cards
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
}
