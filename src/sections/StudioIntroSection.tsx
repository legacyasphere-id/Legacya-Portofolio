import { triggerProjectScope } from '../core/identity'

const AUDIENCE_SEGMENTS = [
  {
    index: '01.',
    title: 'Growing Small & Medium Businesses',
    detail:
      'Companies ready to establish a credible online presence, attract qualified customers, and organize daily operations beyond manual spreadsheets.',
  },
  {
    index: '02.',
    title: 'Established Companies Modernizing',
    detail:
      'Organizations refreshing an outdated website, simplifying internal workflows, or upgrading how they present their brand to modern buyers.',
  },
  {
    index: '03.',
    title: 'Consumer & Product Brands',
    detail:
      'Brands preparing for a product launch, seasonal promotion, or awareness campaign that need cohesive advertising visuals and cinematic video assets.',
  },
]

export function StudioIntroSection() {
  return (
    <section
      id="about"
      className="border-t border-border bg-surface/85 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
          {/* Left Column: Studio Narrative */}
          <div data-animate>
            <p className="eyebrow mb-4">Studio Introduction</p>
            <h2 className="display text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.1] [text-wrap:balance]">
              One studio where visual storytelling and practical business solutions work together.
            </h2>

            <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-muted">
              <p>
                Businesses often face a difficult choice: hire a creative studio that
                understands visual branding but cannot build the digital experience, or
                hire a technical vendor that builds functional tools without an eye for
                brand presentation.
              </p>
              <p className="text-text font-medium">
                Legacya Sphere was built to bridge that divide.
              </p>
              <p>
                We help companies present themselves with clarity, run daily operations
                more smoothly, and communicate their value through thoughtful websites,
                custom business systems, advertising campaign imagery, and cinematic
                video production. Every project begins with a straightforward question:
                what will make the biggest practical difference for your business and
                your customers?
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => triggerProjectScope({})}
                className="btn-primary whitespace-nowrap"
              >
                Discuss Your Project
              </button>
              <a
                href="#services"
                className="link-sweep text-[14px] whitespace-nowrap"
              >
                Explore Our Three Core Services
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Who We Partner With */}
          <div className="card p-6 sm:p-8" data-animate data-delay="100">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-deep">
              Who We Partner With
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              Designed for business owners, founders, and brand leaders who want
              dependable creative and digital execution without building a large
              in-house team.
            </p>

            <div className="mt-6 divide-y divide-border">
              {AUDIENCE_SEGMENTS.map((seg) => (
                <div key={seg.index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[12px] font-semibold text-blue-deep tabular-nums">
                      {seg.index}
                    </span>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-text">
                      {seg.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-[13.5px] leading-relaxed text-muted">
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
