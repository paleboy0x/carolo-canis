"use client";

import { useEffect } from "react";

export function Reveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      nodes.forEach((node) => node.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const el = entry.target as HTMLElement;

          // Stagger children of .stagger groups; delay applies only to the
          // reveal transition, then clears so hover effects stay instant.
          const group = el.closest(".stagger");
          if (group) {
            const index = Array.from(group.children).indexOf(el);
            if (index > 0) {
              el.style.transitionDelay = `${index * 90}ms`;
              el.addEventListener(
                "transitionend",
                () => {
                  el.style.transitionDelay = "";
                },
                { once: true },
              );
            }
          }

          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
