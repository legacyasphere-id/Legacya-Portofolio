import {
  SHOW_PRICING,
  triggerCreativeInspect,
  triggerMotionInspect,
  triggerProjectInspect,
  triggerProjectScope,
} from '../core/identity'
import { useT } from '../i18n/context'

interface ServicePillarMeta {
  index: string
  id:
    | 'digital-systems'
    | 'advertising-assets'
    | 'cinematic-video'
    | 'motion-animation'
  /** Rendered only when SHOW_PRICING is true in identity.ts. */
  startingPrice?: { idr: string; usd: string }
  workTarget: 'digital' | 'creative-ads' | 'creative-video' | 'motion'
}

const SERVICE_PILLARS: ServicePillarMeta[] = [
  {
    index: '01.',
    id: 'digital-systems',
    // TODO(yoga): real starting price for digital systems
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'digital',
  },
  {
    index: '02.',
    id: 'advertising-assets',
    // TODO(yoga): real starting price for campaign assets
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-ads',
  },
  {
    index: '03.',
    id: 'cinematic-video',
    // TODO(yoga): real starting price for video production
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'creative-video',
  },
  {
    index: '04.',
    id: 'motion-animation',
    // TODO(yoga): real starting price for motion animation
    startingPrice: { idr: 'TODO(yoga)', usd: 'TODO(yoga)' },
    workTarget: 'motion',
  },
]

export function SolutionsSection() {
  const { t } = useT()

  const handleExploreWork = (target: ServicePillarMeta['workTarget']) => {
    if (target === 'digital') {
      triggerProjectInspect('inventory-os')
    } else if (target === 'creative-ads') {
      triggerCreativeInspect('Advertising & Campaign Assets')
    } else if (target === 'creative-video') {
      triggerCreativeInspect('Cinematic Video & Visual Production')
    } else {
      triggerMotionInspect()
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
            <p className="eyebrow mb-2.5">{t.services.eyebrow}</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] [text-wrap:balance]">
              {t.services.heading}
            </h2>
          </div>
        </div>

        {/* 4 Service Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_PILLARS.map((meta, idx) => {
            const copy = t.services.pillars[meta.id]
            return (
              <article
                key={meta.id}
                className="card card-hover flex flex-col justify-between p-4 sm:p-6"
                data-animate
                data-delay={String((idx + 1) * 100)}
              >
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2.5">
                    <span className="font-mono text-[12.5px] font-semibold text-blue-deep tabular-nums">
                      {meta.index}
                    </span>
                    <span className="font-mono text-[11px] text-dim">
                      {copy.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[clamp(1.2rem,1.8vw,1.45rem)] font-semibold tracking-[-0.02em] text-text">
                    {copy.title}
                  </h3>

                  <p className="mt-1.5 text-[14px] leading-snug text-muted">
                    {copy.problemAddressed}
                  </p>

                  <ul className="mt-3 space-y-1 border-t border-border pt-3">
                    {copy.deliverables.map((item) => (
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

                  {SHOW_PRICING && meta.startingPrice && (
                    <p className="mt-3 border-t border-border pt-3 font-mono text-[12px] text-text">
                      {t.services.pricingPrefix} {meta.startingPrice.idr} · {t.services.pricingApprox}{meta.startingPrice.usd}
                    </p>
                  )}
                </div>

                {/* Action Footer */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      triggerProjectScope({
                        serviceCategory: meta.id,
                      })
                    }
                    className="btn-primary px-4 py-2 text-[13.5px] whitespace-nowrap"
                  >
                    {t.services.primaryCta}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExploreWork(meta.workTarget)}
                    className="link-sweep text-[13.5px] whitespace-nowrap"
                  >
                    {t.services.secondaryCta}
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
