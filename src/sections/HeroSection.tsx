import { SystemDiagram } from '../components/SystemDiagram'

export function HeroSection() {
  return (
    <section className="grad-hero relative overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* ── Left: copy ─────────────────────────────────────────────── */}
        <div>
          <p
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-blue-deep"
            data-animate
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-deep" />
            AI-Native Business Systems Studio
          </p>

          <h1 className="display max-w-[16ch] text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.04]">
            <span className="block" data-animate data-delay="100">
              Building business
            </span>
            <span className="block" data-animate data-delay="200">
              systems that{' '}
              <em className="italic text-blue-accent">scale</em>
            </span>
            <span className="block" data-animate data-delay="300">
              with your operations.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[52ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-muted"
            data-animate
            data-delay="400"
          >
            Legacya Sphere helps companies transform manual operations into
            scalable business systems — through custom platforms, operational
            dashboards, automation workflows, and intelligent infrastructure.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5" data-animate data-delay="500">
            <a href="#contact" className="btn-primary btn-lg">
              Start a Project
            </a>
            <a href="#systems" className="btn-secondary btn-lg">
              Explore Systems
            </a>
          </div>
        </div>

        {/* ── Right: systems visualization ───────────────────────────── */}
        <div className="lg:pl-4">
          <SystemDiagram />
        </div>
      </div>
    </section>
  )
}
