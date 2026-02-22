/* eslint-disable @next/next/no-img-element */
"use client"; // Required if you are using Next.js App Router

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function VinylDisc() {
  // 1. Create a reference for the element we want to animate
  const vinylRef = useRef(null);
  const audioRef = useRef(null);

  //on double click, play sound, lazy load it
  const handleDoubleClick = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/models/kaboom.mp3");
      // add DJ name to browser url for fun
      if (window && window.history) {
        const currentUrl = window.location.href;
        const newUrl = currentUrl.includes("?DJ=VINIT")
          ? currentUrl
          : `${currentUrl}?DJ=VINIT`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      }

    }

    const audio = audioRef.current;

    // If already playing, do nothing (prevents restart / overlap).
    if (!audio.paused && !audio.ended) {
      return;
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  // Attach the double click event listener to the vinyl image
  useEffect(() => {
    const vinylElement = vinylRef.current;
    if (!vinylElement) return;

    vinylElement.addEventListener("dblclick", handleDoubleClick);

    return () => {
      vinylElement.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);



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
    <div className="flex items-center justify-center cursor-grab transform transition-transform duration-300 hover:-rotate-10">
      <img
        ref={vinylRef}
        src={"/images/polaroid_page/vinyl.svg"}
        alt="vinyl"
        draggable="false"
        className="w-33 sm:min-w-35 md:max-w-40 lg:min-w-50 lg:max-w-80 object-cover z-10 "
      />
    </div>
  );
}

export default VinylDisc;
