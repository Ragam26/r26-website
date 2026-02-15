"use client";

import { useLayoutEffect } from "react";

export default function ScrollReset() {
  useLayoutEffect(() => {
    // 1. Tell browser not to remember scroll position
    if (
      typeof window !== "undefined" &&
      history.scrollRestoration !== "manual"
    ) {
      history.scrollRestoration = "manual";
    }

    // 2. Force scroll to top on every hard refresh
    window.scrollTo(0, 0);
  }, []);

  return null;
}
