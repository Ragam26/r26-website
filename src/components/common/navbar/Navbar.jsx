"use client";

import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [closeOnNextPathChange, setCloseOnNextPathChange] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      gsap.set("#global-navbar", {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen && closeOnNextPathChange) {
      const timer = setTimeout(() => {
        setIsMenuOpen(false);
        setCloseOnNextPathChange(false);
      }, 120);

      return () => clearTimeout(timer);
    }
  }, [pathname, isMenuOpen, closeOnNextPathChange]);

  const handleToggleMenu = async () => {
    // iOS 13+ requires a user gesture to request orientation permission
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          // Dispatch custom event to notify ThreeScene.js
          window.dispatchEvent(new Event("gyroAllowed"));
        }
      } catch (error) {
        console.error("DeviceOrientation permission denied:", error);
      }
    } else {
      // For Android or non-iOS devices, permission is usually granted by default
      window.dispatchEvent(new Event("gyroAllowed"));
    }

    setIsMenuOpen((prev) => {
      const next = !prev;
      if (!next) setCloseOnNextPathChange(false);
      return next;
    });
  };

  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
      setCloseOnNextPathChange(false);
    };
    window.addEventListener("closeMenu", closeMenu);
    return () => window.removeEventListener("closeMenu", closeMenu);
  }, []);

  const handleMenuItemClick = (item) => {
    if (item.external) {
      setIsMenuOpen(false);
      setCloseOnNextPathChange(false);
      return;
    }

    // Same-page navigation won't trigger a pathname change, so close immediately.
    if (item.href === pathname) {
      setIsMenuOpen(false);
      setCloseOnNextPathChange(false);
      return;
    }

    // Keep overlay/navbar open while the next page starts loading,
    // then close after pathname changes to reveal the new page.
    setCloseOnNextPathChange(true);
  };

  useEffect(() => {
    const navbar = document.querySelector("#global-navbar");
    if (!navbar) return;
    const scrollTrigger = ScrollTrigger.getById("landing-scroll");
    if (!scrollTrigger) return;
    if (isMenuOpen) {
      // keep navbar visible
      scrollTrigger.disable(false);
      gsap.to(navbar, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.3,
        overwrite: "auto",
      });

      // ===== FREEZE SCROLL (REAL FIX) =====
      const scrollY = window.scrollY;

      document.body.dataset.scrollY = scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // ===== RESTORE SCROLL =====
      scrollTrigger.enable(false);
      ScrollTrigger.refresh();
      const scrollY = document.body.dataset.scrollY || 0;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, parseInt(scrollY));
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        id="global-navbar"
        className="fixed top-0 inset-x-0 w-full max-w-[100vw] overflow-x-hidden box-border z-[2000] text-white pointer-events-none opacity-0 backdrop-blur-lg bg-black/30 border-b border-white/20"
      >
        <div className="px-6 py-3">
          <div className="grid grid-cols-3 items-center min-w-0">
            {/* Left Side */}
            <div/>

            {/* Center Logo */}
            <div className="flex justify-center">
              <Link href="/" className="block">
                <div className="transition-transform duration-200 hover:scale-105">
                  <Image
                    src="/images/ragam-logo.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-12 object-contain select-none"
                  />
                </div>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex justify-end">
              <div className="transition-transform duration-200 hover:scale-105">
                <button
                  onClick={handleToggleMenu}
                  className="uppercase text-sm tracking-wide cursor-pointer select-none"
                >
                  {isMenuOpen ? (
                    <IoMdClose size={30} />
                  ) : (
                    <MdOutlineMenu size={30} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-white/20" />
      </nav>

      <MenuOverlay isOpen={isMenuOpen} onMenuItemClick={handleMenuItemClick} />
    </>
  );
}

Navbar.displayName = "Navbar";

export default memo(Navbar);
