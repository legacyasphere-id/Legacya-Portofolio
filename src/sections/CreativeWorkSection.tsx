import { useEffect, useRef, useState } from 'react'
import { CREATIVE_WORK_ITEMS } from '../data/creativeWork'
import type { CreativeWorkItem } from '../types/project'
import { triggerProjectScope } from '../core/identity'

type CreativeFilter =
  | 'All Creative Work'
  | 'Advertising & Campaign Assets'
  | 'Cinematic Video & Visual Production'

const FILTER_TABS: CreativeFilter[] = [
  'All Creative Work',
  'Advertising & Campaign Assets',
  'Cinematic Video & Visual Production',
]

interface NetworkInformationLike {
  saveData?: boolean
  effectiveType?: string
}

function isLowBandwidthConnection(): boolean {
  if (typeof navigator === 'undefined') return false
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (!conn) return false
  if (conn.saveData) return true
  return conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g'
}

function SmartPreviewVideo({
  videoUrl,
  posterUrl,
  title,
}: {
  videoUrl: string
  posterUrl?: string
  title: string
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [lowBandwidth] = useState(() => isLowBandwidthConnection())

  useEffect(() => {
    if (lowBandwidth) return
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShouldLoadVideo(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true)
            videoRef.current?.play().catch(() => {
              // Autoplay fallback stays on poster cleanly
            })
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { rootMargin: '160px 0px', threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [lowBandwidth])

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-full aspect-[9/16] overflow-hidden rounded-xl border border-white/25 bg-black shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
    >
      {shouldLoadVideo && !lowBandwidth ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

function CreativeVisualPreview({
  item,
  onExpand,
}: {
  item: CreativeWorkItem
  onExpand: () => void
}) {
  // 1. Real MP4 Video Commercials (9:16 Vertical Cinema Stage with Smart Viewport & Connection Awareness)
  if (item.videoUrl) {
    return (
      <div
        onClick={onExpand}
        className="group relative flex h-[360px] w-full cursor-pointer items-center justify-between gap-4 overflow-hidden p-5 sm:h-[380px] sm:px-7"
        style={{
          background: `linear-gradient(135deg, ${item.palette.primary} 0%, #141821 62%, ${item.palette.accent} 100%)`,
        }}
      >
        {/* Left Editorial Film Spec Column */}
        <div className="hidden max-w-[215px] flex-col justify-between self-stretch py-2 text-white sm:flex">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              9 : 16 Motion Film
            </span>
            <p className="mt-3 font-display text-[1.1rem] font-semibold leading-snug text-white">
              {item.title.split(':')[0]}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/80">
              {item.storyboardFrames[0]?.caption}
            </p>
          </div>

          <div className="space-y-2 border-t border-white/15 pt-3">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.primary }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.secondary }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.accent }}
              />
              <span className="ml-1 font-mono text-[9.5px] text-white/75 truncate">
                {item.palette.label}
              </span>
            </div>
            <p className="font-mono text-[10.5px] font-medium text-white/90">
              Click to watch with sound &rarr;
            </p>
          </div>
        </div>

        {/* Right 9:16 Vertical Video Viewport (Lazy-streamed only when in view) */}
        <SmartPreviewVideo
          videoUrl={item.videoUrl}
          posterUrl={item.previewImage}
          title={item.title}
        />

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
          Watch Film +
        </span>
      </div>
    )
  }

  // 2. Vertical 9:16 Static Social Ad Stage (LATE Cold Brew)
  if (item.aspectRatio === '9:16') {
    return (
      <div
        onClick={onExpand}
        className="group relative flex h-[360px] w-full cursor-pointer items-center justify-between gap-4 overflow-hidden bg-gradient-to-br from-[#231C18] via-[#1C1613] to-[#20334F] p-5 sm:h-[380px] sm:px-7"
      >
        <div className="hidden max-w-[215px] flex-col justify-between self-stretch py-2 text-white sm:flex">
          <div>
            <span className="inline-block rounded-md border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/95">
              9 : 16 Vertical Social Ad
            </span>
            <p className="mt-3 font-display text-[1.1rem] font-semibold leading-snug text-white">
              Built natively for mobile stories &amp; social feeds
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/80">
              Mid-air product motion and floating coffee beans designed to stop vertical scrollers.
            </p>
          </div>

          <div className="space-y-2 border-t border-white/15 pt-3">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.primary }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.secondary }}
              />
              <span
                className="h-2.5 w-2.5 rounded-full border border-white/40"
                style={{ backgroundColor: item.palette.accent }}
              />
              <span className="ml-1 font-mono text-[9.5px] text-white/75 truncate">
                {item.palette.label}
              </span>
            </div>
            <p className="font-mono text-[10.5px] font-medium text-white/90">
              Click to inspect full 9:16 frame &rarr;
            </p>
          </div>
        </div>

        <div className="relative mx-auto h-full aspect-[9/16] overflow-hidden rounded-xl border border-white/25 bg-[#F3ECE1] shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
          <img
            src={item.previewImage}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
          Full Frame +
        </span>
      </div>
    )
  }

  // 3. 4:3 High-Resolution Studio Campaign Key Visuals (Hanasui & Artisanal Burger)
  return (
    <div
      onClick={onExpand}
      className="group relative h-[320px] w-full cursor-pointer overflow-hidden bg-[#14110F] sm:h-[380px]"
    >
      <img
        src={item.previewImage}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 py-3.5 text-white">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/90">
          {item.format}
        </span>
        <span className="rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10px] font-medium text-white backdrop-blur-sm">
          Full Frame +
        </span>
      </div>
    </div>
  )
}

export function CreativeWorkSection() {
  const [filter, setFilter] = useState<CreativeFilter>('All Creative Work')
  const [selectedItem, setSelectedItem] = useState<CreativeWorkItem | null>(null)

  useEffect(() => {
    const onSelectCreative = (e: Event) => {
      const custom = e as CustomEvent<string>
      if (
        custom.detail === 'Advertising & Campaign Assets' ||
        custom.detail === 'Cinematic Video & Visual Production'
      ) {
        setFilter(custom.detail)
      } else {
        setFilter('All Creative Work')
      }
    }
    window.addEventListener('legacya:select-creative', onSelectCreative)
    return () => window.removeEventListener('legacya:select-creative', onSelectCreative)
  }, [])

  useEffect(() => {
    if (!selectedItem) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedItem])

  const filteredItems =
    filter === 'All Creative Work'
      ? CREATIVE_WORK_ITEMS
      : CREATIVE_WORK_ITEMS.filter((item) => item.category === filter)

  return (
    <section
      id="creative-work"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">
              Selected Work · Advertising &amp; Cinematic Production
            </p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              Campaign visuals and cinematic stories crafted around brand objectives
            </h2>
          </div>
          <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
            Product campaign imagery, vertical social advertising creatives, and
            cinematic product commercial films produced by Legacya Sphere. Click
            any showcase to watch the full film or inspect the high-resolution key visual.
          </p>
        </div>

        {/* Filter Bar + Count */}
        <div
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
          data-animate
        >
          <div
            role="group"
            aria-label="Filter creative work by service category"
            className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-surface p-1"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-4 py-2 text-[13px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-blue-deep text-white shadow-sm'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          <p className="font-mono text-[11.5px] text-muted">
            Showing {filteredItems.length} curated advertising &amp; video productions
          </p>
        </div>

        {/* 2-Column Editorial Creative Showcase Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="card card-hover flex flex-col justify-between overflow-hidden"
              data-animate
            >
              <div>
                {/* Visual Media Viewport */}
                <div className="relative w-full border-b border-border">
                  <CreativeVisualPreview
                    item={item}
                    onExpand={() => setSelectedItem(item)}
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 font-mono text-[11px]">
                    <span className="font-medium text-blue-deep">
                      {item.category}
                    </span>
                    <span className="text-muted">
                      {item.classification} · {item.availabilityStatus}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[clamp(1.3rem,2vw,1.6rem)] font-semibold tracking-[-0.02em] text-text">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11.5px] text-dim">
                    {item.brandOrConcept} · {item.format}
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                        Campaign Objective
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                        {item.objective}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                        Creative Direction
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                        {item.creativeDirection}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-blue-deep">
                      Intended Brand Value
                    </p>
                    <p className="mt-1.5 text-[13.5px] font-medium leading-relaxed text-text">
                      {item.intendedValue}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-surface px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="link-sweep text-[13.5px] whitespace-nowrap"
                >
                  {item.videoUrl
                    ? 'Watch Commercial & Deliverables'
                    : 'Inspect Full Visual & Deliverables'}
                  <span aria-hidden="true">&rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: item.category,
                      projectReference: item.title,
                    })
                  }
                  className="btn-secondary px-4 py-2 text-[13px] whitespace-nowrap"
                >
                  Request Similar Creative
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Creative Visual / Video Player & Deliverables Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} creative direction details`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[980px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121620] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-mono text-[11px] text-white/70">
                  {selectedItem.category} · {selectedItem.classification}
                </p>
                <h3 className="mt-0.5 text-[1.25rem] font-semibold text-white">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                Close (ESC) &times;
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
                    Campaign Deliverables
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
                    Creative Direction &amp; Brand Impact
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">
                    {selectedItem.creativeDirection}
                  </p>
                  <p className="mt-3 border-t border-white/10 pt-3 text-[13px] text-white/75">
                    <strong className="text-white">Intended Value:</strong>{' '}
                    {selectedItem.intendedValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
              <span className="font-mono text-[11.5px] text-white/65">
                Status: {selectedItem.availabilityStatus}
              </span>
              <button
                type="button"
                onClick={() => {
                  const item = selectedItem
                  setSelectedItem(null)
                  triggerProjectScope({
                    serviceCategory: item.category,
                    projectReference: item.title,
                  })
                }}
                className="btn-primary px-5 py-2 text-[13px] whitespace-nowrap"
              >
                Inquire About Similar Creative Work
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
