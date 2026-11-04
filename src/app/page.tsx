"use client";

import { useEffect, useRef, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import SiteNav from "@/components/SiteNav";
import TechStrip from "@/components/TechStrip";
import Reveal from "@/components/Reveal";
import BackToTop from "@/components/BackToTop";
import EngagementLayer from "@/components/EngagementLayer";
import ContactLauncher from "@/components/ContactLauncher";
import { EngagementProvider } from "@/components/EngagementProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { WORK_TABS, filterProjects, type WorkTabId } from "@/lib/project-filters";
import { identity } from "@/content/identity";
import { trackEvent } from "@/lib/analytics";

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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const [activeWorkTab, setActiveWorkTab] = useState<WorkTabId>("all");
  const visibleProjects = filterProjects(activeWorkTab);
  const viewedProjects = useRef<Set<string>>(new Set());
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

    // Counter digits use the reference odometer library; the year rows keep
    // the build's own count-up.
    const odometers = [...document.querySelectorAll<HTMLElement>(".odometer:not(.count)")];
    odometers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const els = [...document.querySelectorAll<HTMLElement>(".count.odometer")];
    if (!els.length) return;

    import("odometer").then((mod) => {
      if (cancelled) return;
      type OdometerCtor = new (options: Record<string, unknown>) => {
        update: (value: number) => void;
      };
      const Odometer = ((mod as unknown as { default?: OdometerCtor }).default ??
        mod) as unknown as OdometerCtor;
      const items = els.map((el) => {
        const target = Number(el.dataset.target ?? "0");
        el.textContent = "0";
        const odometer = new Odometer({
          el,
          value: 0,
          format: "d",
          duration: 2000,
        });
        return { el, odometer, target };
      });

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const item = items.find((i) => i.el === entry.target);
            if (item) {
              item.odometer.update(item.target);
              observer?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1 },
      );
      items.forEach((item) => observer!.observe(item.el));
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  // project_view — once per project slug per page load, when a card becomes
  // at least half visible. Re-runs when the Work filter changes so newly
  // rendered cards are observed; the ref keeps de-duplication across filters.
  useEffect(() => {
    const cards = [
      ...document.querySelectorAll<HTMLElement>(".work-card[data-project]"),
    ];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slug = (entry.target as HTMLElement).dataset.project;
          if (!slug || viewedProjects.current.has(slug)) continue;
          viewedProjects.current.add(slug);
          trackEvent("project_view", { project: slug });
        }
      },
      { threshold: 0.5 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeWorkTab]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
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

      <main
        id="main"
        tabIndex={-1}
        className="min-h-screen bg-background text-foreground"
      >
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
          className="relative mx-auto mb-10 h-[323px] w-[320px] bg-[url('/images/portrait.webp')] bg-contain bg-no-repeat bg-[position:100%_100%] min-[576px]:h-[545px] min-[576px]:w-[540px] md:h-[727px] md:w-[720px] lg:absolute lg:bottom-0 lg:left-0 lg:mb-0 lg:h-[595px] lg:w-1/2"
        />
        <div className="mx-auto w-full max-w-[1185px]">
          <div className="flex justify-end">
            <div className="w-full px-[15px] lg:w-1/2">
              <Reveal>
                <h3 className="font-display text-[28px] font-bold uppercase leading-[1.2] text-primary min-[576px]:text-[48px]">
                  {identity.name}
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
              ].map((c, i) => (
                <Reveal
                  key={`${c.line1}-${c.line2}`}
                  variant="up"
                  duration={2}
                  delay={0.3 + i * 0.3}
                >
                  <div className="counter-box">
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="work-section">
        <div className="work-container">
          <div className="work-header">
            <div className="work-title-col">
              <h2 className="work-title">Work</h2>
            </div>
            <div className="work-tabs-col">
              <ul className="work-tabs">
                {WORK_TABS.map((tab) => (
                  <li key={tab.id} className="work-tab-item">
                    <button
                      type="button"
                      className={`work-tab${activeWorkTab === tab.id ? " active" : ""}`}
                      onClick={() => setActiveWorkTab(tab.id)}
                      aria-pressed={activeWorkTab === tab.id}
                      data-filter={tab.id}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="work-tab-content">
          <div key={activeWorkTab} className="work-pane">
            {/*
              Four records max; Swiper loop needs more than four slides at
              the 4-up breakpoint. Loop stays off so each project exists once.
            */}
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={4}
              spaceBetween={1}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className="work-carousel"
            >
              {visibleProjects.map((p) => (
                <SwiperSlide key={p.slug}>
                  <article
                    className="work-card"
                    data-project={p.slug}
                    data-filter={p.filter}
                    data-status={p.status}
                    data-featured={p.featured ? "true" : undefined}
                  >
                    <a
                      className="work-card-thumb"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("outbound_project_click", {
                          project: p.slug,
                          url: p.liveUrl,
                        })
                      }
                    >
                      <img className="work-card-img" src={p.images.card} alt={p.name} />
                      <span className="work-card-overlay" />
                    </a>
                    <div className="work-card-content">
                      <p className="work-card-subtitle">{p.category}</p>
                      <h3 className="work-card-title">
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent("outbound_project_click", {
                              project: p.slug,
                              url: p.liveUrl,
                            })
                          }
                        >
                          {p.name}
                        </a>
                      </h3>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Milestones — reference Achieved section */}
      <section id="counters" className="py-[120px] mt-[-5px] mb-[-10px] bg-background">
        <div className="max-w-[1155px] mx-auto px-[15px]">
          <div className="section-title text-center mb-5">
            <h2 className="title font-display text-[52px] font-bold leading-[1.2] text-primary text-uppercase">
              Milestones
            </h2>
          </div>
          {[
            {
              year: "2022",
              sub: "Started",
              subColor: "text-[#89715b]",
              before: "Started writing code. ",
              after: "No degree, no bootcamp.",
              link: "#about",
            },
            {
              year: "2025",
              sub: "Production",
              subColor: "text-[#f58344]",
              before: "First site in production — ",
              after: "Lighthouse 99 performance, 100 SEO.",
              link: "https://interior-deco-kappa.vercel.app/",
            },
            {
              year: "2026",
              sub: "Build",
              subColor: "text-[#feae01]",
              before: "Built a complete dealership system alone in five weeks: ",
              after: "26 database migrations, back office, auth, PDF enquiries.",
              link: "#work",
            },
          ].map((item, i) => (
            <Reveal key={item.year} variant="up" duration={1.5} delay={0.3 + i * 0.2}>
              <div className="achieved-year pt-[57px]">
                <div className="row flex flex-col md:flex-row items-start gap-[30px]">
                  <div className="year-text min-w-[266px] flex-shrink-0 mt-[30px]">
                    <p className="font-inter text-[18px] font-normal text-white odometer" data-target={item.year}>
                      0
                    </p>
                  </div>
                  <div className="achieved-item flex-1 mt-[30px]">
                    <span className={`sub-title text-[18px] font-normal font-inter ${item.subColor} mt-[30px]`}>
                      {item.sub}
                    </span>
                    <h2 className="title mt-[30px]">
                      <a
                        href={item.link}
                        className="font-display text-[36px] font-bold leading-[1.2] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors duration-300"
                        target={item.link.startsWith("#") ? undefined : "_blank"}
                        rel={item.link.startsWith("#") ? undefined : "noopener noreferrer"}
                      >
                        {item.before}<span className="text-white">{item.after}</span>
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
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
              href={`mailto:${identity.email}`}
              className="font-display text-[clamp(36px,6vw,60px)] font-bold leading-[1.2] text-primary transition-colors hover:text-white"
            >
              {identity.email}
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
        <EngagementProvider>
          <EngagementLayer />
          <ContactLauncher />
        </EngagementProvider>
      </main>
    </>
  );
}