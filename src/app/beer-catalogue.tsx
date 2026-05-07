"use client";

import { Hop, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultBeers, readSavedBeers, type Beer } from "@/lib/beers";

export function BeerCatalogue() {
  const [beers, setBeers] = useState<Beer[]>(defaultBeers);
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("all");

  useEffect(() => {
    const timer = window.setTimeout(() => setBeers(readSavedBeers()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const styles = useMemo(
    () => ["all", ...Array.from(new Set(beers.map((beer) => beer.style)))],
    [beers],
  );

  const filteredBeers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return beers.filter((beer) => {
      const matchesStyle = style === "all" || beer.style === style;
      const matchesQuery =
        !normalizedQuery ||
        [beer.name, beer.style, beer.ingredients, beer.notes]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStyle && matchesQuery;
    });
  }, [beers, query, style]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 rounded-sm border border-[#eaded4] bg-white p-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <label className="relative block">
          <span className="sr-only">Search beers</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#77685f]"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-11 w-full rounded-sm border border-[#eaded4] bg-[#fffdfa] pl-10 pr-3 text-sm outline-none transition focus:border-[#4d2d1d]"
            placeholder="Search by name, style, ingredient..."
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {styles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStyle(item)}
              className={`shrink-0 rounded-sm border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition ${
                style === item
                  ? "border-[#4d2d1d] bg-[#4d2d1d] text-white"
                  : "border-[#eaded4] bg-white text-[#4d2d1d]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredBeers.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {filteredBeers.map((beer) => (
            <article
              key={beer.id}
              className="flex min-h-[460px] flex-col overflow-hidden rounded-sm border border-[#eaded4] bg-white shadow-sm"
            >
              <BeerPhoto beer={beer} />
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-sm bg-[#f7efe6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#4d2d1d]">
                      {beer.style}
                    </span>
                    <Hop size={22} className="text-[#a7662b]" />
                  </div>
                  <h3 className="text-2xl font-black">{beer.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#66554c]">{beer.notes}</p>
                </div>
                <dl className="mt-8 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-t border-[#eaded4] pt-3">
                    <dt className="text-[#77685f]">Ingredients</dt>
                    <dd className="max-w-[58%] text-right font-medium">
                      {beer.ingredients}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-[#eaded4] pt-3">
                    <dt className="text-[#77685f]">ABV</dt>
                    <dd className="font-bold">{beer.abv}</dd>
                  </div>
                  <div className="flex justify-between border-t border-[#eaded4] pt-3">
                    <dt className="text-[#77685f]">Batch</dt>
                    <dd className="font-bold">{beer.batchInfo}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-[#cbb9aa] bg-white p-8 text-center">
          <p className="font-bold">No beers found</p>
          <p className="mt-2 text-sm text-[#66554c]">
            Try a different style, ingredient, or beer name.
          </p>
        </div>
      )}
    </div>
  );
}

function BeerPhoto({ beer }: { beer: Beer }) {
  if (!beer.imageUrl) {
    return (
      <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-[#f7efe6] via-[#d7ad7a] to-[#4d2d1d] text-white">
        <div className="text-center">
          <Hop size={34} className="mx-auto" />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em]">Photo soon</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="aspect-[4/3] overflow-hidden bg-[#f7efe6] bg-cover bg-center"
      role="img"
      aria-label={`${beer.name} beer`}
      style={{ backgroundImage: `url(${beer.imageUrl})` }}
    />
  );
}
