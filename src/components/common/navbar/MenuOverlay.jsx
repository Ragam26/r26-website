"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MenuItem from "./MenuItem";
import ThreeScene from "./ThreeScene";

export default function MenuOverlay({ isOpen }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);

  const menuItems = [
    "Home",
    "Certificates",
    "Workshops",
    "Events",
    "Prodezza",
    "Proshows",
    "Team",
    "Sponsors",
  ];

  // GSAP open / close animation
  useEffect(() => {
    if (!overlayRef.current || !bgRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (isOpen) {
      tl.set(overlayRef.current, { pointerEvents: "all" })
        // fade overlay container
        .to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
        })
        // cinematic darkening effect
        .to(
          bgRef.current,
          {
            opacity: 1,
            duration: 0.6,
          },
          0 // start at same time
        );
    } else {
      tl.to(bgRef.current, {
        opacity: 0,
        duration: 0.4,
      })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.3,
            onComplete: () =>
              gsap.set(overlayRef.current, { pointerEvents: "none" }),
          },
          "-=0.2"
        );
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed inset-0
        opacity-0 pointer-events-none
        flex justify-end
        z-[800]
      "
    >
      {/* Animated Dark Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-black opacity-0 backdrop-blur-sm"
      />

      {/* Menu Items */}
      <div className="relative h-full flex flex-col justify-center w-full lg:w-[45%]">
        {menuItems.map((item, i) => (
          <MenuItem key={item} index={i + 1} title={item} />
        ))}
      </div>
      {/* <ThreeScene/> */}
    </div>
  );
}
