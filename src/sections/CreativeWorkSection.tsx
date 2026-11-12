import { useEffect, useState } from 'react'
import { getCreativeWorkItems } from '../data/creativeWork'
import type { CreativeWorkItem } from '../types/project'
import { triggerProjectScope } from '../core/identity'
import { useRoute } from '../core/router'
import { useT } from '../i18n/context'

export type CreativeCategory =
  | 'Advertising & Campaign Assets'
  | 'Cinematic Video & Visual Production'

function resolveCreativeSelection(
  search: string,
  sectionItems: CreativeWorkItem[],
): string | null {
  const param = new URLSearchParams(search).get('creative')
  if (!param) return null
  const matched = sectionItems.find((c) => c.id === param)
  return matched ? matched.id : null
}

function CreativeVisualPreview({
  item,
  watchFilmBadge,
  fullVisualBadge,
}: {
  item: CreativeWorkItem
  watchFilmBadge: string
  fullVisualBadge: string
}) {
  return (
    <div
      className="relative h-[175px] w-full overflow-hidden sm:h-[230px]"
      style={{
        background: `linear-gradient(135deg, ${item.palette.primary} 0%, #141821 70%, ${item.palette.accent} 100%)`,
      }}
    >
      <img
        src={item.previewImage}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />

      <span className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
        {item.videoUrl ? watchFilmBadge : fullVisualBadge}
      </span>
    </div>
  )
}

interface CreativeWorkSectionProps {
  id?: 'creative-work' | 'cinematic-work'
  category?: CreativeCategory
}

export function CreativeWorkSection({
  id = 'creative-work',
  category = 'Advertising & Campaign Assets',
}: CreativeWorkSectionProps = {}) {
  const { lang, t } = useT()
  const { search } = useRoute()
  const creativeItems = getCreativeWorkItems(lang)
  const sectionItems = creativeItems.filter((item) => item.category === category)
  const pillarKey =
    category === 'Cinematic Video & Visual Production'
      ? 'cinematic-video'
      : 'advertising-assets'
  const pillarCopy = t.services.pillars[pillarKey]

  const [selectedItemId, setSelectedItemId] = useState<string | null>(() =>
    resolveCreativeSelection(search, sectionItems),
  )
  const selectedItem =
    sectionItems.find((item) => item.id === selectedItemId) ?? null

  useEffect(() => {
    if (new URLSearchParams(search).has('creative')) {
      setSelectedItemId(resolveCreativeSelection(search, sectionItems))
    }
  }, [search, lang])

  useEffect(() => {
    const onOpenCreativeItem = (e: Event) => {
      const custom = e as CustomEvent<string>
      if (custom.detail) {
        const matched = sectionItems.find((c) => c.id === custom.detail)
        setSelectedItemId(matched ? matched.id : null)
      }
    }
    window.addEventListener('legacya:open-creative-item', onOpenCreativeItem)
    return () => {
      window.removeEventListener('legacya:open-creative-item', onOpenCreativeItem)
    }
  }, [sectionItems])

  useEffect(() => {
    if (!selectedItemId) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItemId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedItemId])

  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-border bg-bg/95 px-5 py-12 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-8 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">{pillarCopy.subtitle}</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] text-text [text-wrap:balance]">
              {pillarCopy.title}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            {pillarCopy.problemAddressed}
          </p>
        </div>

        {/* Compact Work Cards Grid: Image + Badge + Title + One Line */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3">
          {sectionItems.map((item) => {
            const shortTitle = item.title.split(':')[0] ?? item.title
            const oneLine = item.storyboardFrames[0]?.title ?? item.format
            return (
              <article
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedItemId(item.id)
                  }
                }}
                aria-label={`${t.creativeWork.inspectPrefix} ${item.title}`}
                className="card card-hover group flex cursor-pointer flex-col justify-between overflow-hidden text-left"
                data-animate
              >
                <div className="w-full border-b border-border">
                  <CreativeVisualPreview
                    item={item}
                    watchFilmBadge={t.creativeWork.watchFilmBadge}
                    fullVisualBadge={t.creativeWork.fullVisualBadge}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-5">
                  <div>
                    {item.engagement === 'concept' && (
                      <p className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.08em] text-muted">
                        {t.creativeWork.conceptBadge}
                      </p>
                    )}

                    <h3 className="mt-1.5 text-[14.5px] sm:text-[17px] font-semibold leading-snug tracking-[-0.01em] text-text">
                      {shortTitle}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-[12.5px] sm:text-[13.5px] text-muted">
                      {oneLine}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Fullscreen Creative Visual / Video Player & Deliverables Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} ${t.creativeWork.modalAriaSuffix}`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={() => setSelectedItemId(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121620] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-mono text-[11px] text-white/70">
                  {pillarCopy.title} · {selectedItem.brandOrConcept}
                </p>
                <h3 className="mt-0.5 text-[1.2rem] font-semibold text-white">
                  {selectedItem.title}
                </h3>
                {selectedItem.engagement === 'concept' && (
                  <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                    {t.creativeWork.conceptBadge}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedItemId(null)}
                className="min-h-[44px] rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                {t.creativeWork.closeEsc} &times;
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0B0D12]">
                {selectedItem.videoUrl ? (
                  <div className="flex max-h-[540px] w-full items-center justify-center p-4">
                    <video
                      src={selectedItem.videoUrl}
                      poster={selectedItem.previewImage}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="max-h-[500px] w-auto rounded-lg object-contain shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="flex max-h-[540px] w-full items-center justify-center p-4">
                    <img
                      src={selectedItem.previewImage}
                      alt={selectedItem.title}
                      className="max-h-[500px] w-auto rounded-lg object-contain shadow-2xl"
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {selectedItem.storyboardFrames.map((frame) => (
                  <div
                    key={frame.step}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue-accent">
                      {frame.step}
                    </p>
                    <p className="mt-1.5 text-[13.5px] font-semibold text-white">
                      {frame.title}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-white/75">
                      {frame.caption}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-accent">
                    {t.creativeWork.campaignDeliverables}
                  </p>
                  <ul className="mt-3 space-y-2 text-[13.5px] leading-snug text-white/85">
                    {selectedItem.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-accent" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-accent">
                    {t.creativeWork.creativeDirectionHeading}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">
                    {selectedItem.creativeDirection}
                  </p>
                  <p className="mt-3 border-t border-white/10 pt-3 text-[13px] text-white/75">
                    <strong className="text-white">{t.creativeWork.intendedValueLabel}</strong>{' '}
                    {selectedItem.intendedValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
              <span className="font-mono text-[11.5px] text-white/65">
                {selectedItem.format}
              </span>
              <button
                type="button"
                onClick={() => {
                  const item = selectedItem
                  setSelectedItemId(null)
                  triggerProjectScope({
                    serviceCategory: item.category,
                    projectReference: item.title,
                  })
                }}
                className="btn-primary px-5 py-2 text-[13px] whitespace-nowrap"
              >
                {t.creativeWork.requestSimilar}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export function CinematicWorkSection() {
  return (
    <CreativeWorkSection
      id="cinematic-work"
      category="Cinematic Video & Visual Production"
    />
  )
}
