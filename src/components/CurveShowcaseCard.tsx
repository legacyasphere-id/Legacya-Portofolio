import { useEffect, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CreativeWorkItem, MotionWorkItem, Project } from '../types/project'
import { triggerProjectScope } from '../core/identity'

export interface CurveShowcaseCopy {
  digitalCaption: string
  creativeCaption: string
  motionCaption: string
  prevProjectAria: string
  nextProjectAria: string
  previousLabel: string
  nextLabel: string
  conceptBadge: string
  motionPreparingBadge: string
  motionMountLabel: string
  requestMotionCta: string
  inspectProjectAriaPrefix: string
  selectProjectAriaPrefix: string
  openCreativeAriaPrefix: string
  selectCreativeAriaPrefix: string
  openMotionAriaPrefix: string
  selectMotionAriaPrefix: string
}

const DEFAULT_EN_COPY: CurveShowcaseCopy = {
  digitalCaption: 'My live websites and business systems',
  creativeCaption: 'My campaign visuals and product films',
  motionCaption: 'My motion animation studies',
  prevProjectAria: 'Previous project',
  nextProjectAria: 'Next project',
  previousLabel: 'Previous',
  nextLabel: 'Next project',
  conceptBadge: 'Concept work · not commissioned by the brand',
  motionPreparingBadge: 'Motion studies · source files being prepared',
  motionMountLabel: 'Motion studies coming soon',
  requestMotionCta: 'Request Motion Animation',
  inspectProjectAriaPrefix: 'View details for',
  selectProjectAriaPrefix: 'Select project',
  openCreativeAriaPrefix: 'Open campaign study for',
  selectCreativeAriaPrefix: 'Select campaign study',
  openMotionAriaPrefix: 'Open motion study for',
  selectMotionAriaPrefix: 'Select motion study',
}

interface CurveShowcaseCardProps {
  projects: Project[]
  activeProjectId: string
  onSelectProject: (projectId: string) => void
  onInspectActiveProject: (projectId: string) => void
  creativeItems: CreativeWorkItem[]
  onOpenCreativeItem: (itemId: string) => void
  initialCreativeId?: string
  motionItems?: MotionWorkItem[]
  onOpenMotionItem?: (itemId: string) => void
  initialMotionId?: string
  copy?: Partial<CurveShowcaseCopy>
}

function splitCreativeTitle(item: CreativeWorkItem): {
  shortTitle: string
  oneLine: string
} {
  const parts = item.title.split(':')
  const shortTitle = parts[0]?.trim() || item.title
  const subtitle = parts[1]?.trim()
  const oneLine = subtitle || item.storyboardFrames[0]?.title || item.format
  return { shortTitle, oneLine }
}

export function CurveShowcaseCard({
  projects,
  activeProjectId,
  onSelectProject,
  onInspectActiveProject,
  creativeItems,
  onOpenCreativeItem,
  initialCreativeId,
  motionItems = [],
  onOpenMotionItem,
  initialMotionId,
  copy: customCopy,
}: CurveShowcaseCardProps) {
  const copy: CurveShowcaseCopy = { ...DEFAULT_EN_COPY, ...customCopy }
  const [creativeIdx, setCreativeIdx] = useState(() => {
    if (!initialCreativeId) return 0
    const idx = creativeItems.findIndex(
      (item) => item.id === initialCreativeId || item.category === initialCreativeId,
    )
    return idx >= 0 ? idx : 0
  })
  const [motionIdx, setMotionIdx] = useState(() => {
    if (!initialMotionId) return 0
    const idx = motionItems.findIndex((item) => item.id === initialMotionId)
    return idx >= 0 ? idx : 0
  })
  const [activeRow, setActiveRow] = useState<'digital' | 'creative' | 'motion'>(() => {
    if (initialMotionId) return 'motion'
    if (initialCreativeId) return 'creative'
    return 'digital'
  })

  useEffect(() => {
    if (!initialCreativeId) return
    const idx = creativeItems.findIndex(
      (item) => item.id === initialCreativeId || item.category === initialCreativeId,
    )
    if (idx >= 0) {
      setCreativeIdx(idx)
      setActiveRow('creative')
    }
  }, [initialCreativeId, creativeItems])

  useEffect(() => {
    if (!initialMotionId) return
    const idx = motionItems.findIndex((item) => item.id === initialMotionId)
    if (idx >= 0) {
      setMotionIdx(idx)
      setActiveRow('motion')
    }
  }, [initialMotionId, motionItems])

  useEffect(() => {
    const onSelectCreative = (e: Event) => {
      const custom = e as CustomEvent<string>
      if (!custom.detail) return
      const matchIdx = creativeItems.findIndex(
        (item) => item.category === custom.detail || item.id === custom.detail,
      )
      if (matchIdx >= 0) {
        setCreativeIdx(matchIdx)
        setActiveRow('creative')
      }
    }
    window.addEventListener('legacya:select-creative', onSelectCreative)
    return () => window.removeEventListener('legacya:select-creative', onSelectCreative)
  }, [creativeItems])

  useEffect(() => {
    const onSelectMotion = (e: Event) => {
      const custom = e as CustomEvent<string>
      setActiveRow('motion')
      if (!custom.detail) return
      const matchIdx = motionItems.findIndex((item) => item.id === custom.detail)
      if (matchIdx >= 0) {
        setMotionIdx(matchIdx)
      }
    }
    window.addEventListener('legacya:select-motion', onSelectMotion)
    return () => window.removeEventListener('legacya:select-motion', onSelectMotion)
  }, [motionItems])

  const totalProjects = projects.length
  const rawProjectIdx = projects.findIndex((p) => p.id === activeProjectId)
  const projectIdx = rawProjectIdx >= 0 ? rawProjectIdx : 0

  const prevProjectIdx = (projectIdx - 1 + totalProjects) % totalProjects
  const nextProjectIdx = (projectIdx + 1) % totalProjects

  const prevProject = projects[prevProjectIdx]
  const activeProject = projects[projectIdx]
  const nextProject = projects[nextProjectIdx]

  const totalCreative = creativeItems.length
  const safeCreativeIdx =
    totalCreative > 0 ? ((creativeIdx % totalCreative) + totalCreative) % totalCreative : 0
  const prevCreativeIdx = (safeCreativeIdx - 1 + totalCreative) % totalCreative
  const nextCreativeIdx = (safeCreativeIdx + 1) % totalCreative

  const prevCreative = creativeItems[prevCreativeIdx]
  const activeCreative = creativeItems[safeCreativeIdx]
  const nextCreative = creativeItems[nextCreativeIdx]

  const totalMotion = motionItems.length
  const safeMotionIdx =
    totalMotion > 0 ? ((motionIdx % totalMotion) + totalMotion) % totalMotion : 0
  const prevMotionIdx = totalMotion > 0 ? (safeMotionIdx - 1 + totalMotion) % totalMotion : 0
  const nextMotionIdx = totalMotion > 0 ? (safeMotionIdx + 1) % totalMotion : 0

  const prevMotion = totalMotion > 0 ? motionItems[prevMotionIdx] : undefined
  const activeMotion = totalMotion > 0 ? motionItems[safeMotionIdx] : undefined
  const nextMotion = totalMotion > 0 ? motionItems[nextMotionIdx] : undefined

  const stepProject = (delta: number) => {
    if (totalProjects === 0) return
    const nextIdx = (projectIdx + delta + totalProjects) % totalProjects
    const nextItem = projects[nextIdx]
    if (nextItem) onSelectProject(nextItem.id)
  }

  const stepCreative = (delta: number) => {
    if (totalCreative === 0) return
    setCreativeIdx((prev) => (prev + delta + totalCreative) % totalCreative)
  }

  const stepMotion = (delta: number) => {
    if (totalMotion === 0) return
    setMotionIdx((prev) => (prev + delta + totalMotion) % totalMotion)
  }

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    if (activeRow === 'motion') {
      stepMotion(delta)
    } else if (activeRow === 'creative') {
      stepCreative(delta)
    } else {
      stepProject(delta)
    }
  }

  if (!activeProject || !activeCreative) return null

  const activeCreativeMeta = splitCreativeTitle(activeCreative)
  const prevCreativeMeta = splitCreativeTitle(prevCreative)
  const nextCreativeMeta = splitCreativeTitle(nextCreative)

  return (
    <div
      data-testid="curve-showcase-card"
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      className="cs-card mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-deep"
    >
      {/* Screen-reader polite announcement for active items */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeProject.name} · {activeCreativeMeta.shortTitle} ·{' '}
        {activeMotion ? activeMotion.title : copy.motionMountLabel}
      </div>

      {/* ── ROW 1: Digital Projects ── */}
      <div
        data-testid="curve-row-digital"
        role="region"
        tabIndex={0}
        aria-label={copy.digitalCaption}
        onFocusCapture={() => setActiveRow('digital')}
        onClickCapture={() => setActiveRow('digital')}
        className="cs-row focus:outline-none"
      >
        <p className="cs-cap">{copy.digitalCaption}</p>

        <div className="cs-stage">
          {prevProject && (
            <button
              type="button"
              onClick={() => stepProject(-1)}
              aria-label={`${copy.selectProjectAriaPrefix}: ${prevProject.name}`}
              className="cs-c cs-side cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
            >
              <img
                src={prevProject.screenshots[0]?.src}
                alt={prevProject.screenshots[0]?.alt ?? prevProject.name}
                loading="lazy"
                decoding="async"
                className="object-top"
              />
            </button>
          )}

          <button
            type="button"
            aria-current="true"
            onClick={() => onInspectActiveProject(activeProject.id)}
            aria-label={`${copy.inspectProjectAriaPrefix}: ${activeProject.name}`}
            className="cs-c cs-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <img
              src={activeProject.screenshots[0]?.src}
              alt={activeProject.screenshots[0]?.alt ?? activeProject.name}
              loading={projectIdx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="object-top"
            />
          </button>

          {nextProject && (
            <button
              type="button"
              onClick={() => stepProject(1)}
              aria-label={`${copy.selectProjectAriaPrefix}: ${nextProject.name}`}
              className="cs-c cs-side cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
            >
              <img
                src={nextProject.screenshots[0]?.src}
                alt={nextProject.screenshots[0]?.alt ?? nextProject.name}
                loading="lazy"
                decoding="async"
                className="object-top"
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => stepProject(-1)}
            aria-label={copy.prevProjectAria}
            className="cs-btn cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => stepProject(1)}
            aria-label={copy.nextProjectAria}
            className="cs-btn cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          <span className="cs-hint cs-pl" aria-hidden="true">
            {copy.previousLabel}
          </span>
          <span className="cs-hint cs-nx" aria-hidden="true">
            {copy.nextLabel}
          </span>
        </div>

        <div className="cs-info">
          <b className="cs-title">{activeProject.name}</b>
          <p className="cs-ln">{activeProject.tagline}</p>
          <span className="cs-badge">{activeProject.workClassification}</span>
          <div className="cs-cnt">
            {projectIdx + 1} / {totalProjects}
          </div>
        </div>
      </div>

      {/* ── ROW 2: Creative Campaign Items ── */}
      <div
        data-testid="curve-row-creative"
        role="region"
        tabIndex={0}
        aria-label={copy.creativeCaption}
        onFocusCapture={() => setActiveRow('creative')}
        onClickCapture={() => setActiveRow('creative')}
        className="cs-row focus:outline-none"
      >
        <p className="cs-cap">{copy.creativeCaption}</p>

        <div className="cs-stage">
          {prevCreative && (
            <button
              type="button"
              onClick={() => stepCreative(-1)}
              aria-label={`${copy.selectCreativeAriaPrefix}: ${prevCreativeMeta.shortTitle}`}
              className="cs-c cs-side cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
            >
              <img
                src={prevCreative.previewImage}
                alt={prevCreative.title}
                loading="lazy"
                decoding="async"
              />
            </button>
          )}

          <button
            type="button"
            aria-current="true"
            onClick={() => onOpenCreativeItem(activeCreative.id)}
            aria-label={`${copy.openCreativeAriaPrefix}: ${activeCreative.title}`}
            className="cs-c cs-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <img
              src={activeCreative.previewImage}
              alt={activeCreative.title}
              loading="lazy"
              decoding="async"
            />
          </button>

          {nextCreative && (
            <button
              type="button"
              onClick={() => stepCreative(1)}
              aria-label={`${copy.selectCreativeAriaPrefix}: ${nextCreativeMeta.shortTitle}`}
              className="cs-c cs-side cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
            >
              <img
                src={nextCreative.previewImage}
                alt={nextCreative.title}
                loading="lazy"
                decoding="async"
              />
            </button>
          )}

          <button
            type="button"
            onClick={() => stepCreative(-1)}
            aria-label={copy.prevProjectAria}
            className="cs-btn cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => stepCreative(1)}
            aria-label={copy.nextProjectAria}
            className="cs-btn cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          <span className="cs-hint cs-pl" aria-hidden="true">
            {copy.previousLabel}
          </span>
          <span className="cs-hint cs-nx" aria-hidden="true">
            {copy.nextLabel}
          </span>
        </div>

        <div className="cs-info">
          <b className="cs-title">{activeCreativeMeta.shortTitle}</b>
          <p className="cs-ln">{activeCreativeMeta.oneLine}</p>
          <span className="cs-badge">{copy.conceptBadge}</span>
          <div className="cs-cnt">
            {safeCreativeIdx + 1} / {totalCreative}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Motion Animation Studies ── */}
      <div
        id="motion-work"
        data-testid="curve-row-motion"
        role="region"
        tabIndex={0}
        aria-label={copy.motionCaption}
        onFocusCapture={() => setActiveRow('motion')}
        onClickCapture={() => setActiveRow('motion')}
        className="cs-row scroll-mt-24 focus:outline-none"
      >
        <p className="cs-cap">{copy.motionCaption}</p>

        {activeMotion ? (
          <>
            <div className="cs-stage">
              {prevMotion && (
                <button
                  type="button"
                  onClick={() => stepMotion(-1)}
                  aria-label={`${copy.selectMotionAriaPrefix}: ${prevMotion.title}`}
                  className="cs-c cs-side cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
                >
                  <img
                    src={prevMotion.posterImage}
                    alt={prevMotion.title}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )}

              <button
                type="button"
                aria-current="true"
                onClick={() => {
                  // TODO(yoga): Open motion study details modal or view once motion items are added
                  onOpenMotionItem?.(activeMotion.id)
                }}
                aria-label={`${copy.openMotionAriaPrefix}: ${activeMotion.title}`}
                className="cs-c cs-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
              >
                <img
                  src={activeMotion.posterImage}
                  alt={activeMotion.title}
                  loading="lazy"
                  decoding="async"
                />
              </button>

              {nextMotion && (
                <button
                  type="button"
                  onClick={() => stepMotion(1)}
                  aria-label={`${copy.selectMotionAriaPrefix}: ${nextMotion.title}`}
                  className="cs-c cs-side cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
                >
                  <img
                    src={nextMotion.posterImage}
                    alt={nextMotion.title}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )}

              <button
                type="button"
                onClick={() => stepMotion(-1)}
                aria-label={copy.prevProjectAria}
                className="cs-btn cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
              >
                <ChevronLeft className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => stepMotion(1)}
                aria-label={copy.nextProjectAria}
                className="cs-btn cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
              >
                <ChevronRight className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              </button>

              <span className="cs-hint cs-pl" aria-hidden="true">
                {copy.previousLabel}
              </span>
              <span className="cs-hint cs-nx" aria-hidden="true">
                {copy.nextLabel}
              </span>
            </div>

            <div className="cs-info">
              <b className="cs-title">{activeMotion.title}</b>
              <p className="cs-ln">{activeMotion.subtitle}</p>
              <span className="cs-badge">{copy.conceptBadge}</span>
              <div className="cs-cnt">
                {safeMotionIdx + 1} / {totalMotion}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cs-stage">
              <div
                data-testid="motion-source-mount"
                data-motion-mount="primary"
                className="cs-c cs-mid flex !cursor-default flex-col items-center justify-center !bg-surface px-4 text-center hover:!transform-[translate(-50%,-50%)]"
              >
                {/* TODO(yoga): Mount interactive motion animation source or reel preview here once source files are added */}
                <div aria-hidden="true" className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-8 rounded-full bg-blue-deep/25" />
                  <span className="h-2.5 w-14 rounded-full bg-blue-deep/65" />
                  <span className="h-2.5 w-8 rounded-full bg-blue-deep/25" />
                </div>
                <p className="font-mono text-[11.5px] text-blue-deep">
                  {copy.motionMountLabel}
                </p>
              </div>
            </div>

            <div className="cs-info">
              <span className="cs-badge">{copy.motionPreparingBadge}</span>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    triggerProjectScope({
                      serviceCategory: 'motion-animation',
                    })
                  }
                  className="btn-primary px-5 py-2 text-[13px] whitespace-nowrap"
                >
                  {copy.requestMotionCta}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
