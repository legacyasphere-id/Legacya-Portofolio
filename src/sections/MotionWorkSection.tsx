import { getMotionWorkItems } from '../data/motionWork'
import { SHOW_MOTION_WORK, triggerProjectScope } from '../core/identity'
import { useT } from '../i18n/context'

export function MotionWorkSection() {
  const { lang, t } = useT()
  const motionItems = getMotionWorkItems(lang)
  const hasLiveItems = SHOW_MOTION_WORK && motionItems.length > 0

  return (
    <section
      id="motion-work"
      className="scroll-mt-20 border-t border-border bg-surface/65 px-5 py-12 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-8 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">{t.motionWork.eyebrow}</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] text-text [text-wrap:balance]">
              {t.motionWork.heading}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            {t.motionWork.subline}
          </p>
        </div>

        {hasLiveItems ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {motionItems.map((item) => (
              <article
                key={item.id}
                className="card flex flex-col justify-between overflow-hidden"
                data-animate
              >
                <div
                  data-motion-mount={item.id}
                  className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-raised"
                >
                  {item.sourceUrl ? (
                    <video
                      src={item.sourceUrl}
                      poster={item.posterImage}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : item.posterImage ? (
                    <img
                      src={item.posterImage}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {item.engagement === 'concept' && (
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                        {t.motionWork.conceptBadge}
                      </p>
                    )}
                    <h3 className="mt-1.5 text-[17px] font-semibold tracking-[-0.01em] text-text">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] text-muted">{item.subtitle}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3.5">
                    <span className="font-mono text-[11px] text-dim">{item.format}</span>
                    <button
                      type="button"
                      onClick={() =>
                        triggerProjectScope({
                          serviceCategory: 'motion-animation',
                          projectReference: item.title,
                        })
                      }
                      className="btn-primary px-4 py-2 text-[13px] whitespace-nowrap"
                    >
                      {t.motionWork.requestMotionCta}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article
            className="card overflow-hidden lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-stretch"
            data-animate
          >
            {/* Dedicated mount container for Claude Code to attach the motion animation source */}
            <div className="flex flex-col justify-center border-b border-border bg-raised/65 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div
                data-testid="motion-source-mount"
                data-motion-mount="primary"
                className="relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-surface px-6 text-center shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className="mb-3 flex items-center gap-2"
                >
                  <span className="h-2.5 w-8 rounded-full bg-blue-deep/25" />
                  <span className="h-2.5 w-14 rounded-full bg-blue-deep/65" />
                  <span className="h-2.5 w-8 rounded-full bg-blue-deep/25" />
                </div>
                <p className="font-mono text-[11.5px] text-blue-deep">
                  {t.motionWork.mountLabel}
                </p>
              </div>
            </div>

            {/* Honest preparation details & inquiry trigger */}
            <div className="flex flex-col justify-between p-5 sm:p-7">
              <div>
                <p className="font-mono text-[11px] font-medium text-blue-deep">
                  {t.motionWork.preparingBadge}
                </p>

                <h3 className="mt-2 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold tracking-[-0.02em] text-text">
                  {t.motionWork.preparingTitle}
                </h3>

                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {t.motionWork.preparingBody}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: 'motion-animation',
                    })
                  }
                  className="btn-primary px-5 py-2.5 text-[13.5px] whitespace-nowrap"
                >
                  {t.motionWork.requestMotionCta}
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
