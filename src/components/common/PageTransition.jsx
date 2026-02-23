"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { ROUTE_TRANSITION_EVENT } from "@/lib/routeTransition";

const FADE_DURATION_MS = 700;
const REVEAL_DELAY_MS = 220;
const FADE_EASE = [0.22, 1, 0.36, 1]; // Cubic Bezier for a smooth ease-out effect

function getInternalHrefFromAnchor(anchor) {
  const href = anchor.getAttribute("href");
  if (!href) return null;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
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

      navTimerRef.current = setTimeout(() => {
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
        }
        navTimerRef.current = null;
      }, FADE_DURATION_MS);
    };

    const onDocumentClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

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

      let normalizedHref = href;
      try {
        const nextUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);
        if (nextUrl.origin !== currentUrl.origin) {
          window.location.href = href;
          return;
        }
        normalizedHref = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      } catch {
        return;
      }

      startTransitionTo(normalizedHref);
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener(ROUTE_TRANSITION_EVENT, onCustomNavigate);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener(ROUTE_TRANSITION_EVENT, onCustomNavigate);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [router]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (!navigatingRef.current) return;

    hideTimerRef.current = setTimeout(() => {
      setShowOverlay(false);
      navigatingRef.current = false;
      pendingHrefRef.current = null;
      hideTimerRef.current = null;
    }, REVEAL_DELAY_MS);
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      {showOverlay && (
        <motion.div
          key="route-overlay"
          className="fixed opacity-0 inset-0 z-[1500] bg-black pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION_MS / 1000, ease: FADE_EASE }}
        />
      )}
    </AnimatePresence>
  );
}
