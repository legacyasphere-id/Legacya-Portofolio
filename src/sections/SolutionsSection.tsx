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
  problemAddressed: string
  deliverables: string[]
  /** Rendered only when SHOW_PRICING is true in identity.ts. */
  startingPrice?: { idr: string; usd: string }
  workTarget: 'digital' | 'creative-ads' | 'creative-video'
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    index: '01.',
    id: 'digital-systems',
    title: 'Digital Experiences & Business Systems',
    subtitle: 'Websites · Portals · Tools',
    problemAddressed:
      'Replace outdated sites and manual spreadsheets with one live system.',
    deliverables: [
      'Business websites & portals',
      'Stock, sales & hiring tools',
      'AI workflow automation',
    ],
    // TODO(yoga): real starting price for digital systems
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'digital',
  },
  {
    index: '02.',
    id: 'advertising-assets',
    title: 'Advertising & Campaign Assets',
    subtitle: 'Key Visuals · Product Ads',
    problemAddressed:
      'Campaign imagery that stands out in social and marketplace feeds.',
    deliverables: [
      'Launch key visuals',
      'Staged product imagery',
      'Feed & story ad sets',
    ],
    // TODO(yoga): real starting price for campaign assets
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-ads',
  },
  {
    index: '03.',
    id: 'cinematic-video',
    title: 'Cinematic Video & Visual Production',
    subtitle: 'Product Films · 9:16 Reels',
    problemAddressed:
      'Short product films and vertical reels with motion and sound.',
    deliverables: [
      'Short product films',
      '9:16 social ad reels',
      'Launch storyboards',
    ],
    // TODO(yoga): real starting price for video production
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-video',
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
      className="border-t border-border bg-bg/95 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">What I Do</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] [text-wrap:balance]">
              Three ways I help your business run and sell
            </h2>
          </div>
        </div>

        {/* 3 Service Categories */}
        <div className="grid gap-4 lg:grid-cols-3">
          {SERVICE_PILLARS.map((service, idx) => (
            <article
              key={service.id}
              className="card card-hover flex flex-col justify-between p-4 sm:p-6"
              data-animate
              data-delay={String((idx + 1) * 100)}
            >
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2.5">
                  <span className="font-mono text-[12.5px] font-semibold text-blue-deep tabular-nums">
                    {service.index}
                  </span>
                  <span className="font-mono text-[11px] text-dim">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="mt-3 text-[clamp(1.2rem,1.8vw,1.45rem)] font-semibold tracking-[-0.02em] text-text">
                  {service.title}
                </h3>

                <p className="mt-1.5 text-[14px] leading-snug text-muted">
                  {service.problemAddressed}
                </p>

                <ul className="mt-3 space-y-1 border-t border-border pt-3">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13.5px] leading-snug text-text"
                    >
                      <span className="font-mono text-[12px] font-semibold text-blue-deep select-none" aria-hidden="true">
                        &bull;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {SHOW_PRICING && service.startingPrice && (
                  <p className="mt-3 border-t border-border pt-3 font-mono text-[12px] text-text">
                    Starting from Rp {service.startingPrice.idr} · approx. ${service.startingPrice.usd}
                  </p>
                )}
              </div>

              {/* Action Footer */}
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3.5">
                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: service.title,
                    })
                  }
                  className="btn-primary px-4 py-2 text-[13.5px] whitespace-nowrap"
                >
                  Start a Project
                </button>

                <button
                  type="button"
                  onClick={() => handleExploreWork(service.workTarget)}
                  className="link-sweep text-[13.5px] whitespace-nowrap"
                >
                  See My Work
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
