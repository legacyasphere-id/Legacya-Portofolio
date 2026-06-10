export function HeroSection() {
  return (
    <section className="grad-hero relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-5 pb-20 pt-32 md:px-[6vw]">
      <div
        className="pointer-events-none absolute right-[clamp(-120px,2vw,80px)] top-1/2 aspect-square w-[min(46vw,560px)] -translate-y-1/2 opacity-90 max-md:right-[-30vw] max-md:w-[80vw] max-md:opacity-40"
        aria-hidden="true"
      >
        <div className="ring ring--1" />
        <div className="ring ring--2" />
        <div className="ring ring--3" />
        <div className="sphere-core" />
      </div>

      <p className="eyebrow mb-6" data-animate>
        Legacya Sphere — Digital Systems Studio
      </p>

      <h1 className="max-w-[13ch] text-[clamp(2.4rem,7vw,5.4rem)] leading-[1.06]">
        <span className="block" data-animate data-delay="100">
          We design and build
        </span>
        <span className="block" data-animate data-delay="200">
          <em className="font-soft-italic text-accent">digital systems</em> that make
        </span>
        <span className="block" data-animate data-delay="300">
          brands work better.
        </span>
      </h1>

      <p
        className="mt-7 max-w-[46ch] text-[clamp(1rem,1.4vw,1.125rem)] text-muted"
        data-animate
        data-delay="400"
      >
        Dashboards, e-commerce, and AI-assisted workflows — engineered for
        businesses that want to move faster than their market.
      </p>

      <div className="mt-10 flex flex-wrap gap-4" data-animate data-delay="500">
        <a href="#work" className="btn-solid">
          See our work
        </a>
        <a href="#contact" className="btn-ghost">
          Talk to us
        </a>
      </div>

      <div
        className="absolute bottom-8 left-5 flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:left-[6vw]"
        aria-hidden="true"
      >
        <span>Scroll to explore</span>
        <div className="scrollline" />
      </div>
    </section>
  )
}
