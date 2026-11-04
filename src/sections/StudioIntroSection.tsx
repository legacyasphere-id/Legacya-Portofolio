import { triggerProjectScope } from '../core/identity'

const AUDIENCE_SEGMENTS = [
  {
    index: '01.',
    title: 'Spreadsheets slowing daily operations',
    detail: 'One live dashboard for stock, sales or bookings.',
  },
  {
    index: '02.',
    title: 'Outdated website losing buyer trust',
    detail: 'A fast, mobile-first site that turns visitors into inquiries.',
  },
  {
    index: '03.',
    title: 'Product launch without visuals',
    detail: 'Key visuals, social ads and short product films ready for ads.',
  },
]

export function StudioIntroSection() {
  return (
    <section
      id="about"
      className="border-t border-border bg-surface/85 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-12">
          {/* Left Column: Concrete Problem & Result */}
          <div data-animate>
            <p className="eyebrow mb-2.5">About</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] [text-wrap:balance]">
              Your website, internal tools and campaign visuals, built by one person.
            </h2>

            <p className="mt-3.5 text-[16.5px] leading-[1.6] text-muted">
              Web vendors rarely care about brand look, and creative agencies do
              not build software. I do both directly with an AI-assisted workflow,
              so your system and your visuals ship together in weeks.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => triggerProjectScope({})}
                className="btn-primary whitespace-nowrap"
              >
                Start a Project
              </button>
              <a
                href="#work"
                className="link-sweep whitespace-nowrap"
              >
                See My Work
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Concrete Situations */}
          <div className="card p-4 sm:p-6" data-animate data-delay="100">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-deep">
              Problems I Solve
            </p>

            <div className="mt-3 divide-y divide-border">
              {AUDIENCE_SEGMENTS.map((seg) => (
                <div key={seg.index} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[12px] font-semibold text-blue-deep tabular-nums">
                      {seg.index}
                    </span>
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text">
                      {seg.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 pl-6 text-[13.5px] leading-snug text-muted">
                    {seg.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
