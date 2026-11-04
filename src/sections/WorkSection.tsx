import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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
      className="border-t border-border bg-surface/75 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Section Header */}
        <div
          className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">Selected Work · Digital Systems</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] [text-wrap:balance]">
              Live websites and business tools you can try today
            </h2>
          </div>
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
                className={`min-h-[44px] shrink-0 rounded-t-xl border px-4 py-2 text-left transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'relative z-10 border-border border-b-surface bg-surface text-text'
                    : 'translate-y-1 border-transparent bg-raised/85 text-muted hover:translate-y-0 hover:bg-surface/70 hover:text-text'
                }`}
              >
                <span className="block font-mono text-[10.5px] text-blue-deep tabular-nums">
                  {String(i + 1).padStart(2, '0')} · {project.industry}
                </span>
                <span className="mt-0.5 block text-[13.5px] font-semibold tracking-tight">
                  {project.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Project Card: Image + Title + One Line + Actions */}
        <article
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${active.id}`}
          className="card relative z-0 overflow-hidden rounded-t-none lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center"
          data-animate
        >
          {/* Left Column: Screenshot + Thumbnails */}
          <div className="border-b border-border bg-raised/60 p-4 sm:p-5 lg:border-b-0 lg:border-r">
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
              <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/75 px-2.5 py-1 font-mono text-[10.5px] font-medium text-white backdrop-blur-sm">
                View Details +
              </span>
            </div>

            {active.screenshots.length > 1 && (
              <div className="mt-2.5 grid grid-cols-3 gap-2">
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
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column: Badge + Title + One Line + Actions */}
          <div className="flex flex-col justify-between p-4 sm:p-6">
            <div>
              <p className="font-mono text-[11px] font-medium text-blue-deep">
                {active.workClassification}
              </p>

              <h3 className="mt-1.5 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.02em] text-text">
                {active.name}
              </h3>

              <p className="mt-1.5 text-[15px] leading-snug text-muted">
                {active.tagline}.
              </p>

              {active.buildNotes && (
                <p className="mt-1.5 font-mono text-[11px] text-dim">
                  {active.buildNotes}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-border pt-4">
              {active.links.live && (
                <a
                  className="link-sweep mr-2 whitespace-nowrap"
                  href={active.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Live Demo
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="btn-secondary px-4 py-2 text-[13.5px] whitespace-nowrap"
              >
                View Details
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerProjectScope({
                    serviceCategory: active.category,
                    projectReference: active.name,
                  })
                }
                className="btn-primary px-4 py-2 text-[13.5px] whitespace-nowrap"
              >
                Request Similar Work
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Fullscreen Case Study & Lightbox Modal */}
      {lightboxOpen && currentScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} screen preview`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121316] text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <div>
                <p className="font-mono text-[11px] text-white/65">
                  {active.industry} · {active.workClassification}
                </p>
                <h3 className="text-[1.15rem] font-semibold text-white">
                  {active.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="min-h-[40px] rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-white/20 cursor-pointer"
              >
                Close (ESC) &times;
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
              <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black p-3">
                <img
                  src={currentScreenshot.src}
                  alt={currentScreenshot.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[54vh] w-auto rounded-lg object-contain"
                />
                <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-3 px-2">
                  <p className="text-[12.5px] text-white/80">{currentScreenshot.alt}</p>
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-blue-accent">
                    Business Challenge
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/80">
                    {active.caseStudy.challenge}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-blue-accent">
                    What I Built
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/80">
                    {active.caseStudy.solution}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-blue-accent">
                  Deliverables
                </p>
                <ul className="mt-2.5 grid gap-2 sm:grid-cols-2 text-[13px] text-white/85">
                  {active.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5">
              {active.links.live && (
                <a
                  href={active.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] text-blue-accent hover:underline"
                >
                  Open Live Demo <ArrowUpRight className="inline h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setLightboxOpen(false)
                  triggerProjectScope({
                    serviceCategory: active.category,
                    projectReference: active.name,
                  })
                }}
                className="btn-primary px-4 py-2 text-[13px] whitespace-nowrap"
              >
                Request Similar Work
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
