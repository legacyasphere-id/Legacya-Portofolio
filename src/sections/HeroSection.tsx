import { identity, triggerProjectScope } from '../core/identity'

const HERO_KPIS = [
  {
    value: '4',
    unit: 'Live Systems',
    detail: 'Reference architectures running in production across ERP, HR AI, Healthcare & POS',
  },
  {
    value: '100%',
    unit: 'Code & IP Ownership',
    detail: 'Zero vendor lock-in—deployed directly to your cloud, database, and repositories',
  },
  {
    value: '2–5 Wks',
    unit: 'Typical Delivery',
    detail: 'AI co-engineered architecture and sprints that ship in weeks, not quarters',
  },
  {
    value: '24/7',
    unit: 'Deterministic Ops',
    detail: 'Schema-enforced transactions, Row-Level Security, and auditable AI pipelines',
  },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grad-hero relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-36"
    >
      {/* Editorial reading veil so dark ink and slate copy maintain WCAG AA contrast
          against the continuous background artwork without hiding the art. */}
      <div
        className="hero-veil pointer-events-none absolute inset-y-0 left-0 z-0 w-full lg:w-[82%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto my-auto w-full max-w-[1180px] py-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          {/* Left Column: Kicker + Headline + Lead Copy */}
          <div className="max-w-[740px]">
            <p
              className="eyebrow mb-5 text-blue-deep"
              data-animate
            >
              {identity.positioning} · {identity.location} ({identity.timezone}) · Global B2B Delivery
            </p>

            <h1
              className="display font-extrabold leading-[1.1] tracking-[-0.03em] text-text text-[clamp(2.25rem,4.4vw,3.75rem)] [text-wrap:balance]"
              data-animate
              data-delay="100"
            >
              We turn manual business operations into{' '}
              <span className="text-blue-deep">AI-native</span> systems that scale.
            </h1>

            <p
              className="mt-6 max-w-[62ch] rounded-xl bg-surface/80 p-4 text-[clamp(1rem,1.35vw,1.15rem)] leading-[1.68] text-text backdrop-blur-md border border-border/80 sm:p-5"
              data-animate
              data-delay="200"
            >
              Most growing companies don&rsquo;t need another disconnected SaaS subscription.
              Legacya Sphere architects and ships custom internal platforms, mini-ERPs,
              deterministic AI workflows, and real-time operational dashboards tailored
              to how your business actually runs.
            </p>
          </div>

          {/* Right Column: Action Block */}
          <div
            className="flex flex-col gap-3.5 sm:flex-row lg:w-[260px] lg:shrink-0 lg:flex-col"
            data-animate
            data-delay="300"
          >
            <button
              type="button"
              onClick={() => triggerProjectScope({})}
              className="btn-primary btn-lg w-full whitespace-nowrap"
            >
              Scope Your System
            </button>
            <a
              href="#work"
              className="btn-secondary btn-lg w-full bg-surface/85 backdrop-blur-md whitespace-nowrap text-center"
            >
              Inspect Case Studies
            </a>
            <p className="mt-1 text-center font-mono text-[11px] text-muted lg:text-left">
              Direct founder-led engineering · Free architecture discovery
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Operational KPI Strip below the Hero Split */}
      <div
        className="relative z-10 mx-auto mt-8 w-full max-w-[1180px]"
        data-animate
        data-delay="400"
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {HERO_KPIS.map((kpi) => (
            <div
              key={kpi.unit}
              className="flex flex-col justify-between bg-surface/95 p-6 backdrop-blur-md"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="display font-mono text-[clamp(1.6rem,2.4vw,2.1rem)] font-bold tracking-tight text-blue-deep tabular-nums">
                    {kpi.value}
                  </span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-text">
                    {kpi.unit}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  {kpi.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
