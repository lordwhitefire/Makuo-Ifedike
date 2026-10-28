import Link from "next/link";

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
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
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

      {/* Hero */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background/90 to-background overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Makuo Ifedike
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I build and fix software for small businesses. Slow, half-built, or
            nobody-knows-how-it-works software — that&apos;s the work I take on.
            One person, start to finish. No jargon to hide behind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#work"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              See the work
            </Link>
            <a
              href="#contact"
              className="px-6 py-3 border border-input bg-background hover:bg-accent rounded-md font-medium transition-colors"
            >
              Talk
            </a>
          </div>
        </div>
      </section>

      {/* My Stack */}
      <section id="my-stack" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="client-section" style={{ paddingLeft: 30 }}>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">My Stack</h2>
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
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-muted/50">
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
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Makuo Ifedike
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
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
      <section id="why-choose" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Why Choose Me</h2>
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
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counters */}
      <section id="counters" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { number: "2", label: "complete & shipped" },
              { number: "2", label: "in active development" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center p-8 rounded-xl border border-border bg-background"
              >
                <span className="text-4xl font-bold">{item.number}</span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Work</h2>
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
                  <h3 className="font-semibold mb-1">{p.name}</h3>
                  <p className="text-xs text-primary font-medium">{p.category}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {p.description}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-medium text-primary hover:underline"
                  >
                    See project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              © Makuo Ifedike built by whitefire
            </p>
            <div className="flex space-x-6 text-sm">
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
      </footer>
    </main>
  );
}