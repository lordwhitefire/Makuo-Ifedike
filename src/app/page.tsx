"use client";

import { useEffect, useState, useRef } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import SiteNav from "@/components/SiteNav";
import TechStrip from "@/components/TechStrip";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import EngagementLayer from "@/components/EngagementLayer";

const stacks = [
  { name: "Next.js", src: "nextdotjs" },
  { name: "TypeScript", src: "typescript" },
  { name: "Tailwind CSS", src: "tailwindcss" },
  { name: "Sanity", src: "sanity" },
  { name: "Supabase", src: "supabase" },
  { name: "Neon Postgres", src: "neon" },
  { name: "Clerk", src: "clerk" },
  { name: "Vitest", src: "vitest" },
];

const projects = [
  {
    name: "Interior-deco",
    category: "Marketing site",
    description:
      "A marketing site for an interior decoration studio. Brand-led layout, public pages, structured to turn visits into enquiries.",
    url: "https://interior-deco-kappa.vercel.app/",
    image:
      "/projects/work/interior-deco.png",
    tooltip: "Marketing site for an interior decoration studio",
  },
  {
    name: "Truespec",
    category: "Web app",
    description:
      "Inventory management on the inside, public catalogue on the outside. Two surfaces, one codebase, no admin friction.",
    url: "https://truespec-k4y6.vercel.app/",
    image:
      "/projects/work/truespec.png",
    tooltip: "Inventory + public site, two surfaces, one codebase",
  },
  {
    name: "Athletica",
    category: "Football store",
    description:
      "Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings.",
    url: "https://athletica-blond.vercel.app/",
    image:
      "/projects/work/athletica.png",
    tooltip: "Affiliate platform in preview for a client",
  },
  {
    name: "CP3-legacy",
    category: "Fan site / sports experience",
    description:
      "Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist.",
    url: "https://cp3-legacy.vercel.app/",
    image:
      "/projects/work/cp3-legacy.png",
    tooltip: "Athlete-focused software in development",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const duration = 1500;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * ease).toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toString();
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    const odometers = [...document.querySelectorAll<HTMLElement>(".odometer")];
    odometers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#111]" : "bg-transparent"}`}>
        <div className={`mx-auto w-full max-w-[1185px] px-4 transition-all duration-300 ${scrolled ? "py-[22px]" : "py-[53px]"}`}>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold tracking-tighter">
              Makuo Ifedike
            </div>
            <SiteNav />
          </div>
        </div>
      </header>

      {/* Hero — featured-projects showreel (reference treatment) */}
      <HeroCarousel />

      {/* Reference dark wrapper: stack + about share #090909, so the stack
          hairline stays visible where the about section overlaps it */}
      <div className="bg-card">
      {/* My Stack — reference: bare logo strip, no heading */}
      <section id="my-stack" aria-label="My Stack" className="relative z-[2] pl-[30px]">
        <div className="mx-auto w-full max-w-[1155px] px-[15px]">
          <div className="border-b border-white/15 py-[75px]">
            <TechStrip stacks={stacks} />
          </div>
        </div>
      </section>

      {/* About — reference treatment: plain image block left, text right half */}
      <section
        id="about"
        className="about-padding relative -mb-[5px] -mt-[15px] overflow-x-clip"
      >
        <div
          aria-hidden="true"
          className="relative mx-auto mb-10 h-[323px] w-[320px] bg-[url('/images/portrait.png')] bg-contain bg-no-repeat bg-[position:100%_100%] min-[576px]:h-[545px] min-[576px]:w-[540px] md:h-[727px] md:w-[720px] lg:absolute lg:bottom-0 lg:left-0 lg:mb-0 lg:h-[595px] lg:w-1/2"
        />
        <div className="mx-auto w-full max-w-[1185px]">
          <div className="flex justify-end">
            <div className="w-full px-[15px] lg:w-1/2">
              <Reveal>
                <h3 className="font-display text-[28px] font-bold uppercase leading-[1.2] text-primary min-[576px]:text-[48px]">
                  Makuo Ifedike
                </h3>
                <p className="mb-[25px] mt-9 font-sans text-base leading-8 text-white min-[576px]:text-xl">
                  I build and fix software for small businesses.
                </p>
                <p className="mb-[25px] mt-[25px] font-sans text-sm leading-6 text-white">
                  If something is slow, half-built, or nobody knows how it works
                  anymore — that&apos;s the work I take on.
                </p>
                <p className="mb-[25px] mt-[25px] font-sans text-sm leading-6 text-white">
                  One person, start to finish. No jargon to hide behind.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      </div>

      {/* Why Choose — reference geometry, build copy */}
      <section id="why-choose" className="bg-background">
        <div className="wc-container">
          <div className="why-choose-section">
            <div className="section-title">
              <h2 className="title">why choose me</h2>
            </div>
            <div className="why-choose-wrapper">
              <div className="wc-row wc-row-cols-4">
                {[
                  {
                    title: "Marketing sites",
                    desc: "Public-facing pages that turn visits into enquiries.",
                    icon: "fas fa-bullhorn",
                  },
                  {
                    title: "Web apps",
                    desc: "Custom applications built with Next.js, React, TypeScript.",
                    icon: "icofont icofont-ruler-compass-alt",
                  },
                  {
                    title: "Fix slow systems",
                    desc: "Debugging and refactoring half-built or broken software.",
                    icon: "icofont icofont-credit-card",
                  },
                  {
                    title: "Small business focus",
                    desc: "One person, start to finish. No jargon to hide behind.",
                    icon: "icofont icofont-live-support",
                  },
                ].map((item, i) => (
                  <Reveal key={item.title} variant="up" duration={2} delay={0.3 + i * 0.2}>
                    <div
                      className={`service-box${activeIndex === i ? " active" : ""}`}
                      onMouseEnter={() => setActiveIndex(i)}
                    >
                      <div className="box-content">
                        <h4 className="title">
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {item.title}
                          </a>
                        </h4>
                        <p>{item.desc}</p>
                      </div>
                      <div className="box-icon">
                        <i className={`wc-icon ${item.icon}`} aria-hidden="true" />
                        <a
                          href="#"
                          className="more"
                          onClick={(e) => e.preventDefault()}
                        >
                          More
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="counter-section">
            <div className="wc-row wc-row-cols-3">
              {[
                { target: "4", line1: "projects", line2: "live" },
                { target: "2", line1: "complete &", line2: "shipped" },
                { target: "2", line1: "in active", line2: "development" },
              ].map((c) => (
                <div key={`${c.line1}-${c.line2}`} className="counter-box">
                  <div className="counter-count">
                    <span className="count odometer" data-target={c.target}>
                      0
                    </span>
                  </div>
                  <div className="counter-content">
                    <p>
                      {c.line1} <br /> {c.line2}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-[120px] bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-[52px] font-bold leading-none text-primary">Work</h2>
              <p className="text-muted-foreground mt-4">Selected projects</p>
            </div>
            <div className="flex gap-2 mt-4 lg:mt-0">
              {projects.map((p) => (
                <button
                  key={p.name}
                  className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-primary transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                const el = carouselRef.current;
                if (el) el.scrollBy({ left: -320, behavior: "smooth" });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors hidden md:flex"
              aria-label="Previous"
            >
              <span className="text-xl font-bold text-white">‹</span>
            </button>
            <div
              ref={carouselRef}
              className="flex overflow-x-hidden scroll-snap-x scroll-snap-mandatory pb-8"
            >
              <div className="flex snap-start" id="work-carousel">
                {projects.map((p) => (
                  <div key={p.name} className="snap-start shrink-0 w-[calc(25%-2rem)] px-2">
                    <div className="group relative rounded-xl overflow-hidden border border-border bg-background h-[475px]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-[256px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hover panel — bronze overlay with project info */}
                      <div className="absolute inset-0 bg-[#89715b]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-6">
                        <h3 className="font-sans text-xl font-semibold text-white mb-2" title={p.tooltip}>{p.name}</h3>
                        <p className="font-sans text-sm text-white mb-4">{p.category}</p>
                        <p className="font-sans text-sm text-white/90 line-clamp-3 mb-4">{p.description}</p>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block font-display text-xl font-bold text-white hover:underline"
                        >
                          See project →
                        </a>
                      </div>
                      {/* Default state — content below image */}
                      <div className="p-4">
                        <h3 className="font-sans text-xl font-semibold text-white mb-1" title={p.tooltip}>{p.name}</h3>
                        <p className="font-sans text-sm text-foreground">{p.category}</p>
                        <p className="font-sans text-sm text-foreground mt-2 line-clamp-3">{p.description}</p>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block font-display text-xl font-bold text-white hover:text-primary transition-colors"
                        >
                          See project →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                const el = carouselRef.current;
                if (el) el.scrollBy({ left: 320, behavior: "smooth" });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors hidden md:flex"
              aria-label="Next"
            >
              <span className="text-xl font-bold text-white">›</span>
            </button>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="counters" className="py-[120px] bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-[52px] font-bold leading-none text-primary text-center mb-8">
            Milestones
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                year: "2022",
                sub: "Founded",
                title: "Started building software for small businesses",
                link: "#about",
              },
              {
                year: "2025",
                sub: "Growth",
                title: "Expanded to web apps and e-commerce",
                link: "#work",
              },
              {
                year: "2026",
                sub: "Today",
                title: "Serving clients across industries",
                link: "https://makuo-ifedike.com",
              },
            ].map((item, i) => (
              <Reveal key={item.year} variant="up" duration={1.5} delay={0.3 + i * 0.2}>
                <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-background group">
                  <span
                    className="font-display text-4xl font-bold text-primary odometer"
                    data-target={item.year}
                  >
                    0
                  </span>
                  <span className="mt-2 font-sans text-sm text-foreground/50">{item.sub}</span>
                  <span className="mt-4 font-sans text-sm font-semibold text-foreground">{item.title}</span>
                  <a
                    href={item.link}
                    className="mt-6 inline-block font-sans text-xs uppercase tracking-wider text-primary hover:underline transition-colors"
                    target={item.link.startsWith("#") ? undefined : "_blank"}
                    rel={item.link.startsWith("#") ? undefined : "noopener noreferrer"}
                  >
                    {item.link.startsWith("#") ? "View →" : "Visit →"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Footer — reference treatment */}
      <footer id="contact" className="bg-card">
        <div className="footer-info-box mx-auto w-full max-w-[1185px] px-4 pt-[275px] pb-[195px] text-center">
          <Reveal variant="up" duration={2} delay={0.3}>
            <h4 className="mb-2 font-inter text-2xl font-normal text-foreground/50">
              Let&rsquo;s work together
            </h4>
          </Reveal>
          <Reveal variant="up" duration={2} delay={0.5}>
            <a
              href="mailto:mifedike@gmail.com"
              className="font-display text-[clamp(36px,6vw,60px)] font-bold leading-[1.2] text-primary transition-colors hover:text-white"
            >
              mifedike@gmail.com
            </a>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1185px] px-4 pt-[20px] pb-[70px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border pt-[20px]">
            <p className="font-sans text-sm text-foreground">
              © Makuo Ifedike built by whitefire
            </p>
            <ul className="flex space-x-6 font-sans text-base">
              <li>
                <a
                  href="https://x.com/lwhitefire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ccff] transition-colors hover:text-[#89715b]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/makuoifedike/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-[#89715b]"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lordwhitefire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-[#89715b]"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <BackToTop />
      <EngagementLayer />
    </main>
  );
}