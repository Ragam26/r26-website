"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MenuItem from "./MenuItem";
import ThreeScene from "./ThreeScene";
import Link from "next/link";

export default function MenuOverlay({ isOpen }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const itemsRef = useRef(null);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Certificates", href: "/notFound" },
    { title: "Workshops", href: "/workshops" },
    { title: "Events", href: "/events" },
    { title: "Prodezza", href: "/notFound" },
    { title: "Proshows", href: "/notFound" },
    { title: "Campus Ambassador", href: "/campusAmbassador/regForm" },
    { title: "Team", href: "/notFound" },
    { title: "Sponsors", href: "/notFound" },
  ];

  // GSAP open / close animation
  useEffect(() => {
    if (!overlayRef.current || !bgRef.current || !itemsRef) return;

    const overlay = overlayRef.current;
    const bg = bgRef.current;
    const items = itemsRef.current?.children;

    // kill previous animations safely
    gsap.killTweensOf([overlay, bg, items]);

    gsap.set(items, {
      x: -60,
      opacity: 0,
      filter: "blur(4px)",
    });

    if (isOpen) {
      // ensure overlay is above everything immediately
      gsap.set(overlay, {
        pointerEvents: "all",
        visibility: "visible",
      });

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(bg, {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(items, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: "auto",
        delay: 0.2,
        filter: "blur(0px)",
      });
    } else {
      gsap.to(items, {
        x: -60,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        stagger: {
          each: 0.05,
          from: "end",
        },
      });

      gsap.to(bg, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
        overwrite: "auto",
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(overlay, {
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
        flex
        z-[800]
      "
    >
      {/* Animated Dark Background */}
      <div ref={bgRef} className="absolute inset- opacity-0 backdrop-blur-sm" />

      {/* Menu Items */}
      <div
        ref={itemsRef}
        className="relative h-full flex flex-col justify-center sm:ml-auto w-full sm:w-1/2 items-start pl-5 md:pl-0 pt-10 md:pt-20 z-[850]"
      >
        {menuItems.map((item, i) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              // close overlay after clicking
              const event = new Event("closeMenu");
              window.dispatchEvent(event);
            }}
            className="w-full"
          >
            <MenuItem index={i + 1} title={item.title} />
          </Link>
        ))}
      </div>
      <ThreeScene />
    </div>
  );
}
