import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

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
      "https://images.unsplash.com/photo-1502672260266-1c1ef2ea9131?auto=format&fit=crop&w=480&h=730&q=80",
  },
  {
    name: "Truespec",
    category: "Web app",
    description:
      "Inventory management on the inside, public catalogue on the outside. Two surfaces, one codebase, no admin friction.",
    url: "https://truespec-k4y6.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=480&h=730&q=80",
  },
  {
    name: "Athletica",
    category: "Football store",
    description:
      "Football store and affiliate commerce platform: public storefront with catalogue, cart, checkout, accounts and orders; private admin for products, media, orders and affiliate settings.",
    url: "https://athletica-blond.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=480&h=730&q=80",
  },
  {
    name: "CP3-legacy",
    category: "Fan site / sports experience",
    description:
      "Chris Paul fan site / sports experience: news, player overview, full statistics, biography, gallery, shop, account and wishlist.",
    url: "https://cp3-legacy.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=480&h=730&q=80",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-transparent">
        <div className="mx-auto w-full max-w-[1185px] px-4 py-[53px]">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold tracking-tighter">
              Makuo Ifedike
            </div>
            <nav className="hidden md:flex space-x-8 text-sm">
              <Link href="/" className="hover:text-primary/80 transition-colors">
                Home
              </Link>
              <Link href="#work" className="hover:text-primary/80 transition-colors">
                Work
              </Link>
              <Link href="#about" className="hover:text-primary/80 transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-primary/80 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex space-x-4 text-sm">
              <a
                href="https://github.com/lordwhitefire"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80 transition-colors"
              >
                Github
              </a>
              <a
                href="https://x.com/lwhitefire"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80 transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/makuoifedike/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero — featured-projects showreel (reference treatment) */}
      <HeroCarousel />

      {/* My Stack */}
      <section id="my-stack" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="client-section" style={{ paddingLeft: 30 }}>
            <div className="text-center mb-16">
              <h2 className="font-sans text-sm font-normal tracking-normal text-foreground">My Stack</h2>
              <p className="text-muted-foreground mt-4">
                Tools and technologies I build with
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
              {stacks.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                >
                  <img
                    src={`/logos/${s.src}.svg`}
                    alt={s.name}
                    width="56"
                    height="56"
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="mt-2 text-sm font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-[120px] bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="/images/portrait.png"
                alt="Makuo Ifedike"
                className="w-full max-w-md rounded-lg shadow-lg border border-border"
              />
            </div>
            <div>
              <h3 className="font-display text-5xl font-bold text-primary mb-4">
                Makuo Ifedike
              </h3>
              <p className="font-sans text-xl text-white mb-6">
                I build and fix software for small businesses.
              </p>
              <p className="mb-6">
                If something is slow, half-built, or nobody knows how it works
                anymore — that&apos;s the work I take on.
              </p>
              <p className="mb-6">
                One person, start to finish. No jargon to hide behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section id="why-choose" className="py-[120px] bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-[52px] font-bold leading-none text-primary">Why Choose Me</h2>
            <p className="text-muted-foreground mt-4">
              What I bring to every project
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Marketing sites",
                desc: "Public-facing pages that turn visits into enquiries.",
              },
              {
                title: "Web apps",
                desc: "Custom applications built with Next.js, React, TypeScript.",
              },
              {
                title: "Fix slow systems",
                desc: "Debugging and refactoring half-built or broken software.",
              },
              {
                title: "Small business focus",
                desc: "One person, start to finish. No jargon to hide behind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="font-sans text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id="counters" className="py-[120px] bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-[52px] font-bold leading-none text-primary text-center mb-8">
            Milestones
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { number: "2", label: "complete & shipped" },
              { number: "2", label: "in active development" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-background"
              >
                <span className="font-display text-4xl font-bold text-foreground/50">{item.number}</span>
                <span className="mt-2 font-sans text-sm text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-[120px] bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-sans text-sm font-normal tracking-normal text-foreground">Work</h2>
            <p className="text-muted-foreground mt-4">
              Selected projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((p) => (
              <div key={p.name} className="group relative rounded-xl overflow-hidden border border-border bg-background">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="font-sans text-xl font-semibold text-white mb-1">{p.name}</h3>
                  <p className="font-sans text-sm text-foreground">{p.category}</p>
                  <p className="font-sans text-sm text-foreground mt-2 line-clamp-3">
                    {p.description}
                  </p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Footer — reference treatment */}
      <footer id="contact" className="bg-card">
        <div className="mx-auto w-full max-w-[1185px] px-4 pt-[275px] pb-[195px] text-center">
          <h4 className="mb-2 font-inter text-2xl font-normal text-foreground/50">
            Let&rsquo;s work together
          </h4>
          <a
            href="mailto:mifedike@gmail.com"
            className="font-display text-[clamp(36px,6vw,60px)] font-bold leading-[1.2] text-primary"
          >
            mifedike@gmail.com
          </a>
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
                  className="text-[#00ccff] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/makuoifedike/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lordwhitefire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}