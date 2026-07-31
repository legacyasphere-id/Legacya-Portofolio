/**
 * Hero, the digital front door of an Operating Systems Studio.
 *
 * The attached artwork (body-level fixed background) IS the visual. Nothing
 * here competes with it: no gradients, rings, blobs, orbital graphics or
 * generated art. Typography is the strongest element; three frosted macOS-style
 * panels quietly float over the artwork. Layout is a calm 45 / 55 split with
 * large, intentional whitespace between the two columns.
 */
export function HeroSection() {
  return (
    <section id="hero" className="grad-hero relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36">
      {/* Soft, almost-invisible reading area behind the left column only, a
          gentle editorial backdrop that lifts text legibility off the brighter
          artwork. Not a panel, not a filter, fades out before mid-canvas. */}
      <div
        className="hero-veil pointer-events-none absolute inset-y-0 left-0 z-0 w-full lg:w-[58%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-16 lg:grid-cols-[45%_55%] lg:gap-12">
        {/* Left column: typography. Layout inspired by Brix — the block sits
            in the left third, vertically centred, with generous whitespace and
            a clear reading flow. Same colors, type, sizes, and buttons. */}
        <div className="lg:pl-16 xl:pl-20">
          <h1 className="display font-extrabold leading-[1.1] tracking-[-0.02em] text-[#111111] text-[clamp(1.9rem,4.6vw,3.5rem)]">
            <span className="block" data-animate data-delay="100">
              We&rsquo;re making
            </span>
            <span className="block" data-animate data-delay="200">
              systems that
            </span>
            <span className="block" data-animate data-delay="300">
              <span className="text-blue-accent">scale</span>
            </span>
            <span className="block" data-animate data-delay="400">
              with your
            </span>
            <span className="block" data-animate data-delay="500">
              operations.
            </span>
          </h1>

          <p
            className="mt-8 max-w-[600px] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-white"
            data-animate
            data-delay="500"
          >
            We turn manual workflows into scalable digital infrastructure:
            platforms, dashboards, and automation that help companies operate
            with clarity.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-4 gap-y-4" data-animate data-delay="500">
            <a href="#contact" className="btn-primary btn-lg">
              Discuss Your System
            </a>
            <a href="#work" className="btn-secondary btn-lg">
              View Case Studies
            </a>
          </div>
        </div>

        {/* Right (55%): floating panels */}
        <div className="relative hidden min-h-[460px] lg:block" aria-hidden="true">
          <div
            className="float-card absolute left-[6%] top-[4%] w-[260px] p-5"
            data-animate
            data-delay="200"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Platforms
            </p>
            <p className="mt-2 text-[15px] font-semibold tracking-tight text-[#111111]">
              Centralized operations
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#666666]">
              One source of truth replacing scattered spreadsheets.
            </p>
          </div>

          <div
            className="float-card absolute right-[4%] top-[34%] w-[244px] p-5"
            data-animate
            data-delay="300"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Automation
            </p>
            <p className="mt-2 text-[15px] font-semibold tracking-tight text-[#111111]">
              Repetitive work removed
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#666666]">
              Workflows that run themselves, quietly.
            </p>
          </div>

          <div
            className="float-card absolute bottom-[6%] left-[16%] w-[252px] p-5"
            data-animate
            data-delay="400"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Intelligence
            </p>
            <p className="mt-2 text-[15px] font-semibold tracking-tight text-[#111111]">
              Decisions with clarity
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-[#666666]">
              Live visibility into how the business is performing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
