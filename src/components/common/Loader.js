/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InitialLoader({ onFinished }) {
  const containerRef = useRef(null);
  const sheenRef = useRef(null);

  useEffect(() => {
    gsap.to(sheenRef.current, {
      x: "100%",
      duration: 2.5,
      repeat: -1,
      ease: "power2.inOut",
      delay: 0.85,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black"
    >
      <div className="relative w-[12vmin] h-auto aspect-square">
        <img
          src="/images/landingAnimation/ragamLogoWhite.svg"
          alt="Loading..."
          className="absolute inset-0 w-full h-full object-contain opacity-20"
        />

        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            WebkitMaskImage:
              "url('/images/landingAnimation/ragamLogoWhite.svg')",
            maskImage: "url('/images/landingAnimation/ragamLogoWhite.svg')",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <div
            ref={sheenRef}
            className="absolute inset-0 w-full h-full -translate-x-full"
            style={{
              background:
                "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 75%, transparent 100%)",
              width: "200%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
