import { useEffect } from "react";

/** Adds .is-visible to .fade-up elements as they enter the viewport. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
