"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Progressive reveal: content stays visible without JS.
 * Once mounted, we hide unseen nodes and observe them.
 * Re-runs on route change so client navigations don't leave opacity:0.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      nodes.forEach((node) => node.classList.add("visible"));
      return () => root.classList.remove("js-reveal");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;

          const group = el.closest(".stagger");
          if (group) {
            const index = Array.from(group.children).indexOf(el);
            if (index > 0) {
              el.style.transitionDelay = `${Math.min(index, 8) * 70}ms`;
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
      { threshold: 0.06, rootMargin: "40px 0px -4% 0px" },
    );

    nodes.forEach((node) => {
      if (node.classList.contains("visible")) return;
      observer.observe(node);
    });

    // Safety net: never leave content invisible
    const failsafe = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add("visible"));
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
