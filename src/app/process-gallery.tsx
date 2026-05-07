import { FlaskConical, Leaf, TimerReset, Wine } from "lucide-react";

const steps = [
  {
    title: "Malt",
    text: "Recipes start with the grain bill: pale malt, roasted notes, wheat, rye, and whatever the batch needs.",
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
    icon: Leaf,
  },
  {
    title: "Brew day",
    text: "Small-volume brewing keeps the process hands-on, flexible, and easy to adjust between batches.",
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80",
    icon: FlaskConical,
  },
  {
    title: "Fermentation",
    text: "Yeast, temperature, and time do the quiet work that gives each beer its final character.",
    image:
      "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=900&q=80",
    icon: TimerReset,
  },
  {
    title: "Tasting",
    text: "Every batch ends with notes: aroma, body, finish, and what should change next time.",
    image:
      "https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?auto=format&fit=crop&w=900&q=80",
    icon: Wine,
  },
];

export function ProcessGallery() {
  return (
    <section className="relative overflow-hidden bg-[#231814] py-16 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(228,178,118,0.16),transparent_40%,rgba(101,120,91,0.14))]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-9 max-w-2xl reveal-up">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e4b276]">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            Small-batch brewing, documented like a craft journal.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="reveal-up group overflow-hidden rounded-sm border border-white/12 bg-white/7 backdrop-blur"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <div
                  className="aspect-[4/5] bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${step.image})` }}
                  role="img"
                  aria-label={`${step.title} brewing process`}
                />
                <div className="p-4">
                  <div className="mb-4 grid size-10 place-items-center rounded-sm bg-[#e4b276] text-[#231814]">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/72">{step.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
