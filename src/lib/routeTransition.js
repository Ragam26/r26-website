export const ROUTE_TRANSITION_EVENT = "ragam:route-transition";

export function navigateWithTransition(href) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(ROUTE_TRANSITION_EVENT, {
      detail: { href },
    }),
  );
}

