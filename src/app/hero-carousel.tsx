"use client";

import { Beer, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Small batches, big character",
    text: "Handmade beer brewed by Alvaro Goyos Garcia and Alex.",
    className: "from-[#f2d4a8] via-[#b86f33] to-[#2b1811]",
  },
  {
    title: "Ingredient-first brewing",
    text: "Recipes shaped around malt, hops, yeast, and patience.",
    className: "from-[#f8ead9] via-[#7f8b58] to-[#302016]",
  },
  {
    title: "Fresh, local, personal",
    text: "A simple catalogue for people who want to know what they drink.",
    className: "from-[#fff8ef] via-[#c28a4b] to-[#4d2d1d]",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <div className="relative z-10 overflow-hidden rounded-sm shadow-xl shadow-[#4d2d1d]/10">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide) => (
          <article
            key={slide.title}
            className={`min-h-[420px] w-full shrink-0 bg-gradient-to-br ${slide.className} p-5 text-white sm:min-h-[500px]`}
          >
            <div className="flex h-full flex-col justify-between">
              <Beer className="opacity-90" size={38} />
              <div>
                <p className="text-3xl font-black sm:text-4xl">{slide.title}</p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">{slide.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${
                active === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            className="grid size-10 place-items-center rounded-sm bg-white/90 text-[#231814]"
            aria-label="Previous slide"
            title="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="grid size-10 place-items-center rounded-sm bg-white/90 text-[#231814]"
            aria-label="Next slide"
            title="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
