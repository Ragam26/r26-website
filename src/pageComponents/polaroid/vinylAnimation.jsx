/* eslint-disable @next/next/no-img-element */
"use client"; // Required if you are using Next.js App Router

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function VinylDisc() {
  // 1. Create a reference for the element we want to animate
  const vinylRef = useRef(null);

  // 2. Use the useGSAP hook (safe for React)
  useGSAP(() => {
    gsap.to(vinylRef.current, {
      rotation: 360, // Rotate 360 degrees
      duration: 20, // Takes 5 seconds to complete one full spin
      repeat: -1, // Infinite repeat (-1)
      ease: "none", // "none" (or "linear") ensures constant speed, no slowing down
    });
  });

  return (
    <div className="flex items-center justify-center">
      <img
        ref={vinylRef}
        src={"/images/polaroid_page/vinyl.svg"}
        alt="vinyl"
        className="w-33 sm:min-w-35 md:max-w-40 lg:min-w-50 lg:max-w-80 object-cover z-10 "
      />
    </div>
  );
}

export default VinylDisc;
