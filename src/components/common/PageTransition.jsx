"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTE_TRANSITION_EVENT } from "@/lib/routeTransition";
import Image from "next/image";

const SLIDE_IN_DURATION = 0.8;
const BLINK_DURATION = 1.1;
const POST_BLINK_PAUSE = 0.02;
const TOTAL_NAV_DELAY =
  (SLIDE_IN_DURATION + BLINK_DURATION + POST_BLINK_PAUSE) * 1000;
const REVEAL_DELAY_MS = 100;
const WIPE_EASE = [0.87, 0, 0.13, 1];

function getInternalHrefFromAnchor(anchor) {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return null;
  }
  if (anchor.hasAttribute("download")) return null;
  if (anchor.target && anchor.target !== "_self") return null;

  let nextUrl;
  try {
    nextUrl = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }

  const currentUrl = new URL(window.location.href);
  if (nextUrl.origin !== currentUrl.origin) return null;

  const sameRoute =
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search;

  if (sameRoute) return null;

  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const firstRenderRef = useRef(true);
  const navTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const navigatingRef = useRef(false);
  const pendingHrefRef = useRef(null);

  useEffect(() => {
    const startTransitionTo = (href) => {
      if (!href || navigatingRef.current) return;

      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      pendingHrefRef.current = href;
      navigatingRef.current = true;
      setShowOverlay(true);

      // This timer holds the black screen while the logo blinks
      navTimerRef.current = setTimeout(() => {
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
        }
        navTimerRef.current = null;
      }, TOTAL_NAV_DELAY);
    };

    const onDocumentClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const anchor = event.target?.closest?.("a");
      if (!anchor) return;
      const href = getInternalHrefFromAnchor(anchor);
      if (!href) return;
      event.preventDefault();
      startTransitionTo(href);
    };

    const onCustomNavigate = (event) => {
      const href = event?.detail?.href;
      if (!href) return;
      startTransitionTo(href);
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener(ROUTE_TRANSITION_EVENT, onCustomNavigate);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener(ROUTE_TRANSITION_EVENT, onCustomNavigate);
    };
  }, [router]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (!navigatingRef.current) return;

    // Once pathname changes, wait a tiny bit then trigger the exit slide
    hideTimerRef.current = setTimeout(() => {
      setShowOverlay(false);
      navigatingRef.current = false;
      pendingHrefRef.current = null;
    }, REVEAL_DELAY_MS);
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      {showOverlay && (
        <motion.div
          key="route-overlay"
          className="fixed inset-0 z-[1500] flex items-center justify-center pointer-events-auto"
          initial={{ x: "-120%", skewX: "-20deg" }}
          animate={{ x: "0%", skewX: "-20deg" }}
          exit={{ x: "120%", skewX: "-20deg" }}
          transition={{
            duration: SLIDE_IN_DURATION,
            ease: WIPE_EASE,
          }}
          style={{
            width: "150vw",
            left: "-25vw",
            backgroundColor: "black",
          }}
        >
          <motion.div
            className="relative h-32 w-32"
            style={{ skewX: "20deg" }}
            initial={{ opacity: 0 }}
            animate={{
              // Blink 1: 0 -> 1 -> 0 | Blink 2: 0 -> 1 -> 0
              opacity: [0, 1, 0, 1, 0],
            }}
            transition={{
              duration: BLINK_DURATION,
              // Distributing the blinks evenly over the duration
              times: [0, 0.2, 0.4, 0.6, 0.8],
              delay: SLIDE_IN_DURATION,
              ease: "easeInOut",
            }}
          >
            <Image
              src="https://cdn.ragam.co.in/landingAnimation/ragamLogoWhite.svg"
              alt="Ragam Logo"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
