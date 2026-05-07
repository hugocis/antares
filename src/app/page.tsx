import {
  ArrowRight,
  Camera,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { BeerCatalogue } from "./beer-catalogue";
import { HeroCarousel } from "./hero-carousel";
import { ParallaxField } from "./parallax-field";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffdfa] text-[#231814]">
      <header className="sticky top-0 z-50 border-b border-[#eaded4]/80 bg-[#fffdfa]/88 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Antares Brewing home">
            <span className="grid size-10 place-items-center rounded-sm border border-[#4d2d1d] bg-white text-xs font-black tracking-wide text-[#4d2d1d]">
              LOGO
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold uppercase tracking-[0.18em]">
                Antares
              </span>
              <span className="block text-xs text-[#77685f]">Brewing</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-[#4d2d1d] md:flex">
            <a href="#beers">Beers</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link
              href="/admin/login"
              className="rounded-sm border border-[#4d2d1d] px-4 py-2 text-[#231814] transition hover:bg-[#4d2d1d] hover:text-white"
            >
              Brewer login
            </Link>
          </div>

          <details className="group relative md:hidden">
            <summary className="grid size-10 list-none place-items-center rounded-sm border border-[#eaded4] bg-white text-[#4d2d1d]">
              <Menu size={20} />
            </summary>
            <div className="absolute right-0 mt-3 grid w-48 gap-1 rounded-sm border border-[#eaded4] bg-white p-2 text-sm shadow-2xl">
              <a className="px-3 py-2" href="#beers">
                Beers
              </a>
              <a className="px-3 py-2" href="#about">
                About
              </a>
              <a className="px-3 py-2" href="#contact">
                Contact
              </a>
              <Link className="px-3 py-2" href="/admin/login">
                Brewer login
              </Link>
            </div>
          </details>
        </nav>
      </header>

      <section className="grain relative overflow-hidden">
        <ParallaxField />
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl content-end px-4 pb-6 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10 lg:pb-10">
          <div className="relative z-10 pb-8">
            <p className="mb-4 inline-flex items-center gap-2 rounded-sm border border-[#eaded4] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#77685f]">
              <Sparkles size={14} />
              Handmade beer catalogue
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
              Antares Brewing
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#66554c] sm:text-lg">
              Minimal, honest beer made by Goyos and Alex. Browse the batches,
              read the ingredients, and discover the story behind each handmade recipe.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#beers"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#4d2d1d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#231814]"
              >
                See beers <ArrowRight size={17} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#cbb9aa] bg-white px-5 py-3 text-sm font-bold text-[#231814] transition hover:border-[#4d2d1d]"
              >
                Contact brewers
              </a>
            </div>
          </div>

          <HeroCarousel />
        </div>
      </section>

      <section id="beers" className="relative overflow-hidden py-16 sm:py-24">
        <div className="parallax-band parallax-band-one" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a7662b]">
                Beers
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-5xl">Current batches</h2>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4d2d1d]"
            >
              Brewer login <ChevronRight size={16} />
            </Link>
          </div>

          <BeerCatalogue />
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden border-y border-[#eaded4] bg-white py-16 sm:py-24"
      >
        <div className="parallax-band parallax-band-two" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#a7662b]">
              About us
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Built around good ingredients and better company.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["The brewers", "Alvaro Goyos Garcia and Alex make small handmade batches with a practical, curious approach."],
              ["The idea", "A clear place for people to discover what they brew, what is inside, and how each batch evolves."],
              ["The style", "Minimal white space, warm brown details, and enough personality to feel crafted rather than generic."],
              ["What comes next", "Add the final logo, real photos, Cloudflare email, and a persistent database when ready."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-sm border border-[#eaded4] bg-[#fffdfa] p-5">
                <h3 className="font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#66554c]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#231814] py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e4b276]">
              Contact
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-5xl">
              Follow the project, ask about the brewing process, or share feedback.
            </h2>
          </div>
          <div className="grid gap-3 text-sm">
            <a
              href="mailto:hello@antaresbrewing.com"
              className="flex items-center gap-3 rounded-sm border border-white/15 p-4 transition hover:border-[#e4b276]"
            >
              <Mail size={18} />
              Email placeholder
            </a>
            <a
              href="https://instagram.com"
              className="flex items-center gap-3 rounded-sm border border-white/15 p-4 transition hover:border-[#e4b276]"
            >
              <Camera size={18} />
              Instagram placeholder
            </a>
            <div className="flex items-center gap-3 rounded-sm border border-white/15 p-4">
              <MapPin size={18} />
              Local handmade batches
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
