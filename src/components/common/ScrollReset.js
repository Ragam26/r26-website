"use client";

import { useLayoutEffect } from "react";

export default function ScrollReset() {
  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      history.scrollRestoration !== "manual"
    ) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
