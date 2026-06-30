/**
 * Hero — the digital front door of an Operating Systems Studio.
 *
 * The attached artwork (body-level fixed background) IS the visual. Nothing
 * here competes with it: no gradients, rings, blobs, orbital graphics or
 * generated art. Typography is the strongest element; three frosted macOS-style
 * panels quietly float over the artwork. Layout is a calm 45 / 55 split with
 * large, intentional whitespace between the two columns.
 */
export function HeroSection() {
  return (
    <section className="grad-hero relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-16 lg:grid-cols-[45%_55%] lg:gap-12">
        {/* ── Left (45%): typography ─────────────────────────────────────── */}
        <div>
          <p
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-deep"
            data-animate
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-deep" />
            Operating Systems Studio
          </p>

          <h1 className="display font-bold leading-[0.95] tracking-[-0.03em] text-[#111111] text-[clamp(3rem,8vw,6.5rem)]">
            <span className="block" data-animate data-delay="100">
              Building
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
            <span className="block" data-animate data-delay="400">
              operations.
            </span>
          </h1>

          <p
            className="mt-9 max-w-[560px] text-[clamp(1.05rem,1.6vw,1.375rem)] leading-[1.6] text-[#666666]"
            data-animate
            data-delay="500"
          >
            We transform manual workflows into scalable digital infrastructure —
            platforms, dashboards, and automation that help companies operate
            with greater clarity and efficiency.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-3.5 gap-y-4" data-animate data-delay="500">
            <a href="#contact" className="btn-primary btn-lg">
              Discuss Your System
            </a>
            <a href="#work" className="btn-secondary btn-lg">
              View Case Studies
            </a>
          </div>
        </div>

        {/* ── Right (55%): floating panels ───────────────────────────────── */}
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
