"use client";

import { useEffect, useState } from "react";

/**
 * Hero — featured-projects showreel (reference treatment).
 * Four slides, cycling full-bleed screenshots of the real work.
 *
 * TODO(deploy): the Athletica slide uses a LOCAL dev URL — the product page runs on
 * localhost:3011 and is not deployed anywhere yet. Replace with the production URL
 * before any deploy, or visitors will hit a dead link.
 */

const slides = [
  {
    name: "Interior-deco",
    category: "Marketing site",
    description:
      "A marketing site for an interior decoration studio. Brand-led layout, public pages, structured to turn visits into enquiries.",
    image: "/projects/interior-deco.png",
    url: "https://interior-deco-kappa.vercel.app/",
  },
  {
    name: "Truespec",
    category: "Web app",
    description:
      "Inventory management on the inside, public catalogue on the outside. Two surfaces, one codebase, no admin friction.",
    image: "/projects/truespec.png",
    url: "https://truespec-k4y6.vercel.app/",
  },
  {
    name: "Athletica",
    category: "Football store",
    description:
      "Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings.",
    image: "/projects/athletica.png",
    url: "http://localhost:3011/product/adidas-predator-elite-ft-fg-white-light-green",
  },
  {
    name: "CP3-legacy",
    category: "Fan site / sports experience",
    description:
      "Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist.",
    image: "/projects/cp3-legacy.png",
    url: "https://cp3-legacy.vercel.app/",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    const part =
      h < 12 ? "Good morning." : h < 18 ? "Good afternoon." : "Good evening.";
    setGreeting(`${part} Software, fixed.`);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5500,
    );
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[700px] flex-col justify-end overflow-hidden"
    >
      {/* Full-bleed project screenshots */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />

      {/* Hairline grid at 25% / 50% / 75% */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="absolute top-0 h-full w-px bg-white/[0.35]" style={{ left: "25%" }} />
        <span className="absolute top-0 h-full w-px bg-white/[0.35]" style={{ left: "50%" }} />
        <span className="absolute top-0 h-full w-px bg-white/[0.35]" style={{ left: "75%" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1185px] px-4 pb-[140px]">
        <span
          className="mb-2.5 block font-inter text-[13px] font-medium tracking-wide"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Portfolio — Onitsha, Nigeria
        </span>
        {slide.name === "Athletica" && greeting && (
          <span
            className="mb-2 block font-inter text-[0.85rem] font-medium uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {greeting}
          </span>
        )}
        <h4 className="mb-2 font-sans text-xl text-white">{slide.category}</h4>
        <h1 className="font-display text-[clamp(48px,9vw,100px)] font-bold leading-[1] tracking-tight text-white">
          {slide.name}
        </h1>
        <p className="mt-10 max-w-2xl font-inter text-lg text-white">
          {slide.description}
        </p>
        <a
          href={slide.url}
          target={slide.url.startsWith("http://localhost") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="mt-10 inline-block font-display text-xl font-bold text-white transition-colors hover:text-primary"
        >
          See project →
        </a>
      </div>
    </section>
  );
}
