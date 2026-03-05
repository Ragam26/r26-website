"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MenuItem from "./MenuItem";
import ThreeScene from "./ThreeScene";
import Link from "next/link";

export default function MenuOverlay({ isOpen, onMenuItemClick }) {
  const overlayRef = useRef(null);
  const bgRef = useRef(null);
  const itemsRef = useRef(null);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Certificates", href: "/notFound" },
    { title: "Workshops", href: "/workshops" },
    { title: "Events", href: "/events" },
    { title: "I-Ink", href: "/i-ink" },
    { title: "Prodezza", href: "/notFound" },
    { title: "Proshows", href: "/notFound" },
    {
      title: "Campus Ambassador",
      href: "https://ca.ragam.co.in",
      external: true,
    },
    { title: "Team", href: "/notFound" },
    { title: "Sponsors", href: "/notFound" },
    { title: "Contact", href: "contact" },
  ];

  // Helper to handle the delay on click
  const handleItemClick = (e, item) => {
    // If it's an external link, we don't want to prevent default,
    // but we still want to trigger the close after a delay.
    if (item.external) {
      setTimeout(() => {
        onMenuItemClick?.(item);
      }, 400);
      return;
    }

    // For internal links:
    // 1. We let the Link component handle the pre-fetching/navigation
    // 2. We trigger the close signal after your 400ms delay
    setTimeout(() => {
      onMenuItemClick?.(item);
    }, 400);
  };

  useEffect(() => {
    if (!overlayRef.current || !bgRef.current || !itemsRef) return;

    const overlay = overlayRef.current;
    const bg = bgRef.current;
    const items = itemsRef.current?.children;

    gsap.killTweensOf([overlay, bg, items]);

    if (isOpen) {
      gsap.set(overlay, { pointerEvents: "all", visibility: "visible" });

      gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(bg, { opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(items, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.2,
        filter: "blur(0px)",
      });
    } else {
      // Outward animations
      gsap.to(items, {
        x: -60,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        stagger: { each: 0.05, from: "end" },
      });

      gsap.to(bg, { opacity: 0, duration: 0.45, ease: "power2.in" });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none", visibility: "hidden" });
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 opacity-0 pointer-events-none flex z-800"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0 backdrop-blur-sm"
      />
      <div className="md:hidden absolute inset-0 bg-black z-800" />

      <div
        ref={itemsRef}
        className="relative h-full flex flex-col justify-center sm:ml-auto w-full sm:w-1/2 items-start pl-5 md:pl-0 pt-10 md:pt-20 z-850"
      >
        {menuItems.map((item, i) => (
          <Link
            key={item.title}
            href={item.href}
            // Use our new handler for the delay
            onClick={(e) => handleItemClick(e, item)}
            target={item.external ? "_blank" : "_self"}
            className="w-full"
          >
            <MenuItem index={i + 1} title={item.title} />
          </Link>
        ))}
      </div>
      <div className="hidden md:flex">
        <ThreeScene />
      </div>
    </div>
  );
}
