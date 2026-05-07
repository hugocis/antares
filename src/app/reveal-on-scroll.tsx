"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    function observeHiddenElements() {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".reveal-up:not(.is-visible)"),
      );

      elements.forEach((element) => observer.observe(element));
    }

    const mutationObserver = new MutationObserver(observeHiddenElements);

    observeHiddenElements();
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
