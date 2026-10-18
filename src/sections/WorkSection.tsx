import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { triggerProjectScope } from '../core/identity'

const OVERVIEW: Record<string, string> = {
  'inventory-os':
    'A multi-role warehouse & purchasing ERP that gives operations teams real-time control over stock valuation, atomic movements, and reorder thresholds.',
  'ai-cv-screening':
    'An AI recruitment engine that extracts unstructured resume data with Gemini, then ranks candidates on a deterministic, 100% bias-auditable scoring formula.',
  'brightpath-dental':
    'A bilingual patient portal & automated lead capture engine with a GPT-4o RAG clinical assistant and instant Make.com to Gmail front-desk dispatch.',
  'legacya-pos':
    'A unified restaurant operations platform synchronizing cashier order intake, real-time Kitchen Display System (KDS) queues, and owner revenue telemetry.',
}

const SOLUTION: Record<string, string> = {
  'inventory-os':
    'Centralized web platform with role-based access control, atomic Prisma stock transactions, purchase order lifecycle tracking, and automated low-stock alerts.',
  'ai-cv-screening':
    'Gemini 1.5 Flash handles structured JSON extraction while a deterministic scoring engine (Skills 40% · Experience 30% · Education 20% · Fit 10%) guarantees reproducible rankings.',
  'brightpath-dental':
    'Next.js 15 portal where GPT-4o answers over verified clinical documents, dual-path forms persist leads to Supabase, and next/server after() triggers instant staff notifications.',
  'legacya-pos':
    'Nine operational screens across three role personas backed by Supabase PostgreSQL Row-Level Security, server-side RPCs, and live Realtime WebSocket order queues.',
}

const METRIC: Record<string, string> = {
  'inventory-os':
    '4 operational roles · Atomic database stock ledger · -80% initial JS bundle payload (829 KB → 162 KB)',
  'ai-cv-screening':
    '100% reproducible candidate ranking · Multi-axis radar explainability · Instant CSV & JSON audit export',
  'brightpath-dental':
    '24/7 EN/ID bilingual RAG assistant · Dual-path lead capture · Zero-latency Make.com → Gmail staff alerts',
  'legacya-pos':
    '9 production screens · 3 RLS-enforced roles · Zero-refresh Supabase Realtime kitchen display queue',
}

const RECOMMENDED_TIER: Record<string, string> = {
  'inventory-os': 'Custom Operations OS',
  'ai-cv-screening': 'AI Workflow & Automation',
  'brightpath-dental': 'AI Workflow & Automation',
  'legacya-pos': 'Custom Operations OS',
}

type ViewMode = 'executive' | 'architecture'

export function WorkSection() {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? 'inventory-os')
  const [screenshotIdx, setScreenshotIdx] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('executive')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const active = projects.find((p) => p.id === activeId) ?? projects[0]
  const currentScreenshot = active.screenshots[screenshotIdx] ?? active.screenshots[0]

  // Reset screenshot index when switching project tabs
  useEffect(() => {
    setScreenshotIdx(0)
  }, [activeId])

  // Listen for cross-section "Inspect Reference System" triggers from SolutionsSection
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

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    if (!lightboxOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') {
        setScreenshotIdx((prev) => (prev + 1) % active.screenshots.length)
      }
      if (e.key === 'ArrowLeft') {
        setScreenshotIdx((prev) =>
          (prev - 1 + active.screenshots.length) % active.screenshots.length,
        )
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxOpen, active.screenshots.length])

  return (
    <section
      id="work"
      className="border-t border-border bg-surface/65 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Header with high-contrast legibility */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-animate>
          <div className="max-w-[52ch]">
            <p className="eyebrow mb-4">Featured Work &amp; Reference Architectures</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]">
              Production systems you can test live
            </h2>
          </div>
          <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
            Every system below is deployed in production. Inspect the business
            outcomes or switch to the Architecture Deep-Dive to examine data
            flows, database boundaries, and AI co-engineering decisions.
          </p>
        </div>

        {/* Interactive Folder Tabs */}
        <div
          role="tablist"
          aria-label="Featured reference systems by industry"
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
                className={`shrink-0 rounded-t-xl border px-5 py-3.5 text-left transition-all duration-200 whitespace-nowrap ${
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

        {/* Active Case Study Panel */}
        <article
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${active.id}`}
          className="card relative z-0 overflow-hidden rounded-t-none lg:grid lg:grid-cols-[1.15fr_1.35fr] lg:items-stretch"
          data-animate
        >
          {/* Left Column: Multi-Screenshot Gallery + Thumbnail Switcher */}
          <div className="flex flex-col justify-between border-b border-border bg-raised/60 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div>
              {/* Header bar above screenshot */}
              <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
                <span>
                  Screen {screenshotIdx + 1} of {active.screenshots.length} · Production Deployment
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="font-medium text-blue-deep hover:underline whitespace-nowrap"
                >
                  Expand Fullscreen &#x26F6;
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
                aria-label={`Expand ${currentScreenshot?.alt ?? active.name} screenshot`}
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
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3.5 opacity-95">
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
                        className={`group relative aspect-[16/10] overflow-hidden rounded-lg border transition-all duration-150 ${
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

            {/* Technical Stack Breakdown List (Clean Unboxed Metadata) */}
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                Production Stack &amp; Infrastructure
              </p>
              <p className="mt-2 font-mono text-[12px] leading-relaxed text-text">
                {active.stack.join(' · ')}
              </p>

              {/* Direct Live & Repo Links */}
              <div className="mt-4 flex flex-wrap items-center gap-5 pt-1">
                {active.links.live && (
                  <a
                    className="link-sweep text-[13.5px] whitespace-nowrap"
                    href={active.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Launch Live System
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
                {active.links.github && (
                  <a
                    className="text-[13px] font-medium text-muted hover:text-blue-deep transition-colors whitespace-nowrap"
                    href={active.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inspect Source Repository &nearr;
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Content with Mode Switcher */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
            <div>
              {/* Top Metadata + View Mode Segmented Control */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2 font-mono text-[11px] text-blue-deep">
                  <span>{active.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-muted">{active.industry}</span>
                </div>

                {/* Interactive Segmented Control: Executive Summary vs Architecture Deep-Dive */}
                <div
                  role="group"
                  aria-label="Case study view mode"
                  className="inline-flex rounded-lg border border-border bg-raised p-1"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('executive')}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
                      viewMode === 'executive'
                        ? 'bg-surface text-blue-deep shadow-sm'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    Executive Summary
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('architecture')}
                    className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
                      viewMode === 'architecture'
                        ? 'bg-surface text-blue-deep shadow-sm'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    Architecture &amp; AI Role
                  </button>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-5">
                <h3 className="text-[clamp(1.55rem,2.6vw,2.15rem)] font-semibold tracking-[-0.02em] text-text">
                  {active.name}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {OVERVIEW[active.id] ?? active.tagline}
                </p>
              </div>

              {/* View Mode 1: Executive Summary */}
              {viewMode === 'executive' ? (
                <div className="mt-6 space-y-5">
                  <dl className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                        Operational Bottleneck
                      </dt>
                      <dd className="text-[13.5px] leading-relaxed text-muted">
                        {active.caseStudy.problem}
                      </dd>
                    </div>
                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <dt className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                        Engineered Solution
                      </dt>
                      <dd className="text-[13.5px] leading-relaxed text-muted">
                        {SOLUTION[active.id] ?? active.caseStudy.technicalExecution}
                      </dd>
                    </div>
                  </dl>

                  <div className="rounded-xl border border-blue/30 bg-blue/[0.06] p-4">
                    <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-deep">
                      Commercial &amp; Operational Outcome
                    </p>
                    <p className="text-[14px] leading-relaxed text-text">
                      {active.caseStudy.outcome}
                    </p>
                  </div>

                  {METRIC[active.id] && (
                    <div className="rounded-xl border border-border bg-raised/75 px-4 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                        Verified System Specifications
                      </p>
                      <p className="mt-1 font-mono text-[12px] font-medium text-blue-deep">
                        {METRIC[active.id]}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* View Mode 2: Architecture & AI Co-Engineering Deep-Dive */
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-border bg-bg/60 p-4">
                    <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-deep">
                      01. System Decomposition &amp; Data Flow
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-text">
                      {active.caseStudy.architectureNote}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                        02. Architectural Reasoning
                      </p>
                      <p className="text-[13px] leading-relaxed text-muted">
                        {active.caseStudy.thinkingProcess}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-bg/60 p-4">
                      <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">
                        03. AI Co-Engineering Role
                      </p>
                      <p className="text-[13px] leading-relaxed text-muted">
                        {active.caseStudy.aiRole}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue/30 bg-blue/[0.06] p-4">
                    <p className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-blue-deep">
                      04. Security, Schema &amp; Execution Rigor
                    </p>
                    <p className="text-[13.5px] leading-relaxed text-text">
                      {active.caseStudy.technicalExecution}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Conversion Bar inside Case Study */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div>
                <p className="text-[13px] font-medium text-text">
                  Need a system architected like {active.name}?
                </p>
                <p className="text-[12px] text-muted">
                  We customize this reference architecture to your exact workflow and team roles.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  triggerProjectScope({
                    tier: RECOMMENDED_TIER[active.id] ?? 'Custom Operations OS',
                    systemType: active.type,
                    projectReference: active.name,
                  })
                }
                className="btn-primary px-5 py-2.5 text-[13.5px] whitespace-nowrap"
              >
                Scope a Similar System
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
          aria-label={`${active.name} screenshot viewer`}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[1140px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121316] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Bar */}
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
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium text-white hover:bg-white/20"
              >
                Close (ESC) &#x2715;
              </button>
            </div>

            {/* Image Viewport */}
            <div className="relative flex flex-1 items-center justify-center overflow-auto bg-black p-4">
              <img
                src={currentScreenshot.src}
                alt={currentScreenshot.alt}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto rounded-lg object-contain"
              />
            </div>

            {/* Caption & Prev/Next Controls */}
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
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:bg-white/15 whitespace-nowrap"
                  >
                    &larr; Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setScreenshotIdx((prev) => (prev + 1) % active.screenshots.length)
                    }
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] text-white hover:bg-white/15 whitespace-nowrap"
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
