"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThreeScene from "./ThreeScene";
import MenuItem from "./MenuItem";

export default function MenuOverlay({ isOpen }) {
  const overlayRef = useRef(null);

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
    if (!overlayRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: isOpen ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
      pointerEvents: isOpen ? "all" : "none",
    });
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="
        fixed inset-0
        opacity-0 pointer-events-none
        flex justify-end
        bg-[#1a1a1a]
        z-40
      "
    >
      {/* Three.js Background */}
      <ThreeScene />

      {/* Menu Items */}
      <div className="relative h-full flex flex-col justify-center w-full lg:w-[45%]">
        {menuItems.map((item, i) => (
          <MenuItem
            key={item}
            index={i + 1}
            title={item}
          />
        ))}
      </div>
    </div>
  );
}
