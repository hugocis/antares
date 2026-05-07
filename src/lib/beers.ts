export type Beer = {
  id: string;
  name: string;
  style: string;
  batchInfo: string;
  abv: string;
  imageUrl: string;
  ingredients: string;
  notes: string;
};

export const beerStorageKey = "antares-brewing-beers";

export const defaultBeers: Beer[] = [
  {
    id: "goyos-golden",
    name: "Goyos Golden Ale",
    style: "Golden ale",
    batchInfo: "Small pilot batch",
    abv: "5.1%",
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=900&q=80",
    ingredients: "Pilsner malt, wheat, Cascade hops, house yeast",
    notes: "Bright, crisp, honeyed malt with a clean citrus finish.",
  },
  {
    id: "alex-porter",
    name: "Alex Brown Porter",
    style: "Porter",
    batchInfo: "Winter recipe",
    abv: "6.2%",
    imageUrl:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=80",
    ingredients: "Maris Otter, chocolate malt, oats, East Kent Goldings",
    notes: "Soft roast, cacao, toasted bread, and a rounded body.",
  },
  {
    id: "antares-saison",
    name: "Antares Saison",
    style: "Farmhouse saison",
    batchInfo: "Experimental batch",
    abv: "5.8%",
    imageUrl:
      "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&w=900&q=80",
    ingredients: "Pale malt, rye, Saaz hops, saison yeast, orange peel",
    notes: "Peppery, dry, lightly floral, built for sunny afternoons.",
  },
];

export function readSavedBeers() {
  const saved = window.localStorage.getItem(beerStorageKey);
  if (!saved) {
    return defaultBeers;
  }

  try {
    const beers = JSON.parse(saved) as Partial<Beer>[];
    return beers.map((beer, index) => ({
      ...defaultBeers[index % defaultBeers.length],
      ...beer,
      batchInfo: beer.batchInfo ?? "Showcase batch",
      imageUrl: beer.imageUrl ?? "",
    }));
  } catch {
    return defaultBeers;
  }
}
