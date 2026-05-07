"use client";

import { ImageIcon, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { beerStorageKey, defaultBeers, readSavedBeers, type Beer } from "@/lib/beers";

export function AdminBeerEditor() {
  const [beers, setBeers] = useState(defaultBeers);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setBeers(readSavedBeers()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const hasBeers = useMemo(() => beers.length > 0, [beers.length]);

  function updateBeer(id: string, field: keyof Beer, value: string) {
    setBeers((current) =>
      current.map((beer) => (beer.id === id ? { ...beer, [field]: value } : beer)),
    );
  }

  function addBeer() {
    const id = `beer-${Date.now()}`;
    setBeers((current) => [
      ...current,
      {
        id,
        name: "New beer",
        style: "Style",
        batchInfo: "Showcase batch",
        abv: "0.0%",
        imageUrl: "",
        ingredients: "Malt, hops, yeast, water",
        notes: "Describe the flavour, body, aroma, and finish.",
      },
    ]);
  }

  function removeBeer(id: string) {
    setBeers((current) => current.filter((beer) => beer.id !== id));
  }

  function saveBeers() {
    window.localStorage.setItem(beerStorageKey, JSON.stringify(beers));
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }

  function resetBeers() {
    setBeers(defaultBeers);
    window.localStorage.removeItem(beerStorageKey);
    setSavedAt(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="grid gap-4">
        {hasBeers ? (
          beers.map((beer) => (
            <article key={beer.id} className="rounded-sm border border-[#eaded4] bg-white p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a7662b]">
                    Beer
                  </p>
                  <h2 className="mt-1 text-xl font-black">{beer.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => removeBeer(beer.id)}
                  className="grid size-10 place-items-center rounded-sm border border-[#eaded4] text-[#8c2f24] transition hover:border-[#8c2f24]"
                  aria-label={`Remove ${beer.name}`}
                  title="Remove beer"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-4 overflow-hidden rounded-sm border border-[#eaded4] bg-[#f7efe6]">
                {beer.imageUrl ? (
                  <div
                    className="aspect-[16/7] bg-cover bg-center"
                    role="img"
                    aria-label={`${beer.name} preview`}
                    style={{ backgroundImage: `url(${beer.imageUrl})` }}
                  />
                ) : (
                  <div className="grid aspect-[16/7] place-items-center text-[#77685f]">
                    <div className="text-center">
                      <ImageIcon className="mx-auto" size={28} />
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em]">
                        Add photo URL
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name" value={beer.name} onChange={(value) => updateBeer(beer.id, "name", value)} />
                <Field label="Style" value={beer.style} onChange={(value) => updateBeer(beer.id, "style", value)} />
                <Field label="Batch note" value={beer.batchInfo} onChange={(value) => updateBeer(beer.id, "batchInfo", value)} />
                <Field label="ABV" value={beer.abv} onChange={(value) => updateBeer(beer.id, "abv", value)} />
                <Field
                  label="Photo URL"
                  value={beer.imageUrl}
                  onChange={(value) => updateBeer(beer.id, "imageUrl", value)}
                  wide
                />
                <Field
                  label="Ingredients"
                  value={beer.ingredients}
                  onChange={(value) => updateBeer(beer.id, "ingredients", value)}
                  wide
                />
                <TextArea
                  label="Tasting notes"
                  value={beer.notes}
                  onChange={(value) => updateBeer(beer.id, "notes", value)}
                />
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-sm border border-dashed border-[#cbb9aa] bg-white p-8 text-center">
            <p className="font-bold">No beers yet</p>
            <p className="mt-2 text-sm text-[#66554c]">Add a beer to start the catalogue.</p>
          </div>
        )}
      </div>

      <aside className="h-fit rounded-sm border border-[#eaded4] bg-white p-4 lg:sticky lg:top-6">
        <div className="grid gap-3">
          <button
            type="button"
            onClick={saveBeers}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#4d2d1d] px-4 py-3 text-sm font-bold text-white"
          >
            <Save size={17} />
            Save changes
          </button>
          <button
            type="button"
            onClick={addBeer}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#cbb9aa] px-4 py-3 text-sm font-bold"
          >
            <Plus size={17} />
            Add beer
          </button>
          <button
            type="button"
            onClick={resetBeers}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#eaded4] px-4 py-3 text-sm font-bold text-[#66554c]"
          >
            <RotateCcw size={17} />
            Reset demo
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#66554c]">
          {savedAt ? `Saved locally at ${savedAt}.` : "Changes are unsaved until you press save."}
        </p>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  wide,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  wide?: boolean;
}) {
  return (
    <label className={`grid gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#77685f]">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-sm border border-[#eaded4] bg-[#fffdfa] px-3 text-sm outline-none transition focus:border-[#4d2d1d]"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 sm:col-span-2">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#77685f]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="resize-y rounded-sm border border-[#eaded4] bg-[#fffdfa] px-3 py-3 text-sm outline-none transition focus:border-[#4d2d1d]"
      />
    </label>
  );
}
