import {
  SHOW_PRICING,
  triggerCreativeInspect,
  triggerProjectInspect,
  triggerProjectScope,
} from '../core/identity'

interface ServicePillar {
  index: string
  id: string
  title: string
  subtitle: string
  availability: string
  problemAddressed: string
  deliverables: string[]
  /** Rendered only when SHOW_PRICING is true in identity.ts. */
  startingPrice?: { idr: string; usd: string }
  workTarget: 'digital' | 'creative-ads' | 'creative-video'
  workActionLabel: string
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    index: '01.',
    id: 'digital-systems',
    title: 'Digital Experiences & Business Systems',
    subtitle: 'Websites · Customer Portals · Internal Tools & Automation',
    availability: 'Available Now · Full Studio Execution',
    problemAddressed:
      'Outdated websites and manual spreadsheets that slow down customers and teams.',
    deliverables: [
      'Business websites and landing pages',
      'Internal tools for stock, sales or hiring',
      'AI assistants and workflow automation',
    ],
    // TODO(yoga): real starting price for digital systems
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'digital',
    workActionLabel: 'Explore Live Digital Systems',
  },
  {
    index: '02.',
    id: 'advertising-assets',
    title: 'Advertising & Campaign Assets',
    subtitle: 'Campaign Imagery · Product Visuals · Creative Direction',
    availability: 'Available Now · Campaign & Brand Creative',
    problemAddressed:
      'Generic product photos that blend into crowded feeds and say nothing about the brand.',
    deliverables: [
      'Campaign key visuals for digital and print',
      'Product imagery built around your brand',
      'Social ads in feed and story formats',
    ],
    // TODO(yoga): real starting price for campaign assets
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-ads',
    workActionLabel: 'View Advertising Concepts',
  },
  {
    index: '03.',
    id: 'cinematic-video',
    title: 'Cinematic Video & Visual Production',
    subtitle: 'Promotional Films · Campaign Reels · Visual Storytelling',
    availability: 'Short-Form & Concept Production Available Now · Extended Films Scoped Custom',
    problemAddressed:
      'Static images that cannot show the quality or story behind a product quickly.',
    deliverables: [
      'Short product films for ads',
      'Vertical reels for social campaigns',
      'Storyboards and motion direction for launches',
    ],
    // TODO(yoga): real starting price for video production
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-video',
    workActionLabel: 'View Cinematic Production Studies',
  },
]

export function SolutionsSection() {
  const handleExploreWork = (target: ServicePillar['workTarget']) => {
    if (target === 'digital') {
      triggerProjectInspect('inventory-os')
    } else if (target === 'creative-ads') {
      triggerCreativeInspect('Advertising & Campaign Assets')
    } else {
      triggerCreativeInspect('Cinematic Video & Visual Production')
    }
  }

  return (
    <section
      id="services"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">What I Do</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              Three focused ways I help your business grow and operate
            </h2>
          </div>
          <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
            Hire me for one capability, such as a business website, a launch
            campaign or a promotional video, or combine them into one brand and
            digital rollout.
          </p>
        </div>

        {/* 3 Service Categories */}
        <div className="grid gap-7 lg:grid-cols-3">
          {SERVICE_PILLARS.map((service, idx) => (
            <article
              key={service.id}
              className="card card-hover flex flex-col justify-between p-7 md:p-8"
              data-animate
              data-delay={String((idx + 1) * 100)}
            >
              <div>
                {/* Editorial Index + Availability Metadata (unboxed) */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                  <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                    {service.index}
                  </span>
                  <span className="font-mono text-[11px] text-dim">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="mt-5 text-[clamp(1.3rem,2vw,1.55rem)] font-semibold tracking-[-0.02em] text-text">
                  {service.title}
                </h3>

                <p className="mt-1.5 font-mono text-[11px] text-blue-deep">
                  {service.availability}
                </p>

                {/* Problem */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Problem
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-text">
                    {service.problemAddressed}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    Deliverables
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[13.5px] leading-snug text-muted"
                      >
                        <span className="font-mono text-[12px] font-semibold text-blue-deep select-none" aria-hidden="true">
                          &bull;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {SHOW_PRICING && service.startingPrice && (
                  <p className="mt-5 border-t border-border pt-4 font-mono text-[12px] text-text">
                    Starting from Rp {service.startingPrice.idr} · approx. ${service.startingPrice.usd}
                  </p>
                )}
              </div>

              {/* Action Footer */}
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: service.title,
                    })
                  }
                  className="btn-primary w-full py-2.5 text-[13.5px] whitespace-nowrap"
                >
                  Inquire About {service.index.replace('.', '') === '01' ? 'Digital Systems' : service.index.replace('.', '') === '02' ? 'Advertising Assets' : 'Video Production'}
                </button>

                <button
                  type="button"
                  onClick={() => handleExploreWork(service.workTarget)}
                  className="link-sweep mx-auto text-[13px] whitespace-nowrap"
                >
                  {service.workActionLabel}
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
