"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MenuItem from "./MenuItem";
import ThreeScene from "./ThreeScene";

export default function MenuOverlay({ isOpen }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const itemsRef = useRef(null);

  const menuItems = [
    "Home",
    "Certificates",
    "Workshops",
    "Events",
    "Prodezza",
    "Proshows",
    "Campus Ambassador",
    "Team",
    "Sponsors",
  ];

  // GSAP open / close animation
  useEffect(() => {
  if (!overlayRef.current || !bgRef.current) return;

  // kill previous animations safely
  gsap.killTweensOf([overlayRef.current, bgRef.current, itemsRef.current?.children]);
  
  if (isOpen) {
    // ensure overlay is above everything immediately
    gsap.set(overlayRef.current, {
      pointerEvents: "all",
      visibility: "visible",
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });

  } else {
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.in",
      overwrite: "auto",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => {
        gsap.set(overlayRef.current, {
          pointerEvents: "none",
          visibility: "hidden",
        });
      },
    });
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
      <div ref={itemsRef} className="relative h-full flex flex-col justify-center w-full lg:w-[45%]">
        {menuItems.map((item, i) => (
          <MenuItem key={item} index={i + 1} title={item} />
        ))}
      </div>
      {/* <ThreeScene/> */}
    </div>
  );
}
