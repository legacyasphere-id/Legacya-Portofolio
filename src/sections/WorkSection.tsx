import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { triggerProjectScope } from '../core/identity'

export function WorkSection() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? 'inventory-os')
  const [screenshotIdx, setScreenshotIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const active = projects.find((p) => p.id === activeId) ?? projects[0]
  const currentScreenshot = active.screenshots[screenshotIdx] ?? active.screenshots[0]

  useEffect(() => {
    setScreenshotIdx(0)
  }, [activeId])

  useEffect(() => {
    const onSelectProject = (e: Event) => {
      const custom = e as CustomEvent<string>
      if (custom.detail && projects.some((p) => p.id === custom.detail)) {
        setActiveId(custom.detail)
      }
    }
    window.addEventListener('legacya:select-project', onSelectProject)
    return () => window.removeEventListener('legacya:select-project', onSelectProject)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') {
        setScreenshotIdx((prev) => (prev + 1) % active.screenshots.length)
      }
      if (e.key === 'ArrowLeft') {
        setScreenshotIdx(
          (prev) => (prev - 1 + active.screenshots.length) % active.screenshots.length,
        )
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, active.screenshots.length])

  return (
    <section
      id="work"
      className="border-t border-border bg-surface/75 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">Selected Work · Digital Experiences &amp; Business Systems</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              Live business websites and operational tools you can explore today
            </h2>
          </div>
          <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
            Each system below is a working digital product developed by Legacya
            Sphere to solve a real operational challenge, from warehouse stock
            management and recruitment to clinic bookings and restaurant service.
          </p>
        </div>

        {/* Interactive Folder Tabs */}
        <div
          role="tablist"
          aria-label="Selected digital systems by industry"
          className="scrollbar-none -mb-px flex gap-1.5 overflow-x-auto"
          data-animate
        >
          {projects.map((project, i) => {
            const isActive = project.id === active.id
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                id={`work-tab-${project.id}`}
                aria-selected={isActive}
                aria-controls="work-panel"
                onClick={() => setActiveId(project.id)}
                className={`shrink-0 rounded-t-xl border px-5 py-3.5 text-left transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'relative z-10 border-border border-b-surface bg-surface text-text'
                    : 'translate-y-1 border-transparent bg-raised/85 text-muted hover:translate-y-0 hover:bg-surface/70 hover:text-text'
                }`}
              >
                <span className="block font-mono text-[10.5px] text-blue-deep tabular-nums">
                  {String(i + 1).padStart(2, '0')} · {project.industry}
                </span>
                <span className="mt-0.5 block text-[14px] font-semibold tracking-tight">
                  {project.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Project Showcase Panel */}
        <article
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${active.id}`}
          className="card relative z-0 overflow-hidden rounded-t-none lg:grid lg:grid-cols-[1.15fr_1.35fr] lg:items-stretch"
          data-animate
        >
          {/* Left Column: Multi-Screen Visual Gallery */}
          <div className="flex flex-col justify-between border-b border-border bg-raised/60 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div>
              {/* Header Bar above Screenshot */}
              <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
                <span>
                  View {screenshotIdx + 1} of {active.screenshots.length} · {active.workClassification}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="font-medium text-blue-deep hover:underline whitespace-nowrap cursor-pointer"
                >
                  Expand Fullscreen &nearr;
                </button>
              </div>

              {/* Primary Screenshot Frame */}
              <div
                onClick={() => setLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxOpen(true)
                  }
                }}
                aria-label={`Expand ${currentScreenshot?.alt ?? active.name} preview`}
                className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
              >
                {currentScreenshot ? (
                  <img
                    src={currentScreenshot.src}
                    alt={currentScreenshot.alt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-raised p-6 text-center">
                    <span className="display text-2xl text-muted">{active.name}</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3.5 opacity-95">
                  <p className="text-[12px] leading-snug text-white">
                    {currentScreenshot?.alt}
                  </p>
                </div>
              </div>

              {/* Interactive Screenshot Thumbnails */}
              {active.screenshots.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {active.screenshots.map((shot, idx) => {
                    const isSelected = idx === screenshotIdx
                    return (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setScreenshotIdx(idx)}
                        aria-label={`View screen ${idx + 1}: ${shot.alt}`}
                        className={`group relative aspect-[16/10] overflow-hidden rounded-lg border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'border-blue-deep ring-2 ring-blue-deep/25'
                            : 'border-border opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white tabular-nums">
                          0{idx + 1}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Key Highlights & Live Preview Link */}
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                Operational Highlights
              </p>
              <p className="mt-1.5 font-mono text-[12px] leading-relaxed text-text">
                {active.caseStudy.highlights}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-1">
                {active.links.live && (
                  <a
                    className="link-sweep text-[13.5px] whitespace-nowrap"
                    href={active.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try the Live Interactive System
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                <span className="font-mono text-[11px] text-dim">
                  Category: {active.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Business-Focused Case Study */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
            <div>
              {/* Unboxed Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4 font-mono text-[11px]">
                <div className="flex flex-wrap items-center gap-2 text-blue-deep">
                  <span>{active.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-muted">{active.industry}</span>
                </div>
                <span className="text-dim">{active.workClassification}</span>
              </div>

              {/* Title & Tagline */}
              <div className="mt-5">
                <h3 className="text-[clamp(1.55rem,2.6vw,2.15rem)] font-semibold tracking-[-0.02em] text-text">
                  {active.name}
                </h3>
                <p className="mt-1.5 text-[15px] font-medium text-blue-deep">
                  {active.tagline}
                </p>
              </div>

              {/* Challenge, Solution & Intended Business Value */}
              <div className="mt-6 space-y-5">
                <div className="grid gap-6 border-t border-border pt-5 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                      Business Challenge
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-muted">
                      {active.caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                      Our Solution
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-muted">
                      {active.caseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="border-t border-border pt-5">
                  <p className="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                    What Was Delivered
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {active.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] leading-snug text-muted"
                      >
                        <span className="font-mono text-[12px] font-semibold text-blue-deep select-none" aria-hidden="true">
                          &bull;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intended Value */}
                <div className="border-t border-border pt-5">
                  <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-deep">
                    Intended Business Value
                  </p>
                  <p className="text-[14px] font-medium leading-relaxed text-text">
                    {active.caseStudy.intendedValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Conversion Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="text-[13.5px] font-medium text-text">
                  Need a website or business system like {active.name}?
                </p>
                <p className="text-[12px] text-muted">
                  We tailor every solution around how your business and team actually work.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  triggerProjectScope({
                    serviceCategory: 'Digital Experiences & Business Systems',
                    projectReference: active.name,
                  })
                }
                className="btn-primary px-5 py-2.5 text-[13.5px] whitespace-nowrap"
              >
                Request a Similar Solution
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && currentScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} screen preview`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[1140px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121316] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 text-white">
              <div className="flex items-center gap-3 text-[13px]">
                <span className="font-semibold">{active.name}</span>
                <span aria-hidden="true" className="text-white/40">·</span>
                <span className="font-mono text-[11.5px] text-white/70 tabular-nums">
                  Screen {screenshotIdx + 1} of {active.screenshots.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                Close (ESC) &times;
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-auto bg-black p-4">
              <img
                src={currentScreenshot.src}
                alt={currentScreenshot.alt}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto rounded-lg object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-3.5 text-white">
              <p className="text-[13px] text-white/80">{currentScreenshot.alt}</p>
              {active.screenshots.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setScreenshotIdx(
                        (prev) =>
                          (prev - 1 + active.screenshots.length) % active.screenshots.length,
                      )
                    }
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:bg-white/15 whitespace-nowrap cursor-pointer"
                  >
                    &larr; Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setScreenshotIdx((prev) => (prev + 1) % active.screenshots.length)
                    }
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:bg-white/15 whitespace-nowrap cursor-pointer"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
