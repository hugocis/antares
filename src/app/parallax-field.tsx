"use client";

import { useEffect, useState } from "react";

export function ParallaxField() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      return;
    }

    let frame = 0;

    function update() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-24 top-16 h-36 w-[145%] rotate-[-8deg] bg-[#4d2d1d]/8"
        style={{ transform: `translate3d(0, ${offset * 0.08}px, 0) rotate(-8deg)` }}
      />
      <div
        className="absolute -right-28 top-72 h-24 w-[120%] rotate-[9deg] bg-[#a7662b]/10"
        style={{ transform: `translate3d(0, ${offset * 0.14}px, 0) rotate(9deg)` }}
      />
      <div
        className="absolute bottom-10 left-1/2 h-40 w-[130%] -translate-x-1/2 rotate-[-3deg] bg-[#65785b]/8"
        style={{
          transform: `translate3d(-50%, ${offset * -0.06}px, 0) rotate(-3deg)`,
        }}
      />
    </div>
  );
}
