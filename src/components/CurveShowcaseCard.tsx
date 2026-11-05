import { useEffect, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CreativeWorkItem, Project } from '../types/project'

export interface CurveShowcaseCopy {
  digitalCaption: string
  creativeCaption: string
  prevProjectAria: string
  nextProjectAria: string
  previousLabel: string
  nextLabel: string
  conceptBadge: string
  inspectProjectAriaPrefix: string
  selectProjectAriaPrefix: string
  openCreativeAriaPrefix: string
  selectCreativeAriaPrefix: string
}

const DEFAULT_EN_COPY: CurveShowcaseCopy = {
  digitalCaption: 'My live websites and business systems',
  creativeCaption: 'My campaign visuals and product films',
  prevProjectAria: 'Previous project',
  nextProjectAria: 'Next project',
  previousLabel: 'Previous',
  nextLabel: 'Next project',
  conceptBadge: 'Concept work · not commissioned by the brand',
  inspectProjectAriaPrefix: 'View details for',
  selectProjectAriaPrefix: 'Select project',
  openCreativeAriaPrefix: 'Open campaign study for',
  selectCreativeAriaPrefix: 'Select campaign study',
}

interface CurveShowcaseCardProps {
  projects: Project[]
  activeProjectId: string
  onSelectProject: (projectId: string) => void
  onInspectActiveProject: (projectId: string) => void
  creativeItems: CreativeWorkItem[]
  onOpenCreativeItem: (itemId: string) => void
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
  copy: customCopy,
}: CurveShowcaseCardProps) {
  const copy: CurveShowcaseCopy = { ...DEFAULT_EN_COPY, ...customCopy }
  const [creativeIdx, setCreativeIdx] = useState(0)
  const [activeRow, setActiveRow] = useState<'digital' | 'creative'>('digital')

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

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    if (activeRow === 'creative') {
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
        {activeProject.name} · {activeCreativeMeta.shortTitle}
      </div>

      {/* ── ROW 1: Digital Projects ── */}
      <div
        role="region"
        aria-label={copy.digitalCaption}
        onFocusCapture={() => setActiveRow('digital')}
        onClickCapture={() => setActiveRow('digital')}
        className="cs-row"
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
        role="region"
        aria-label={copy.creativeCaption}
        onFocusCapture={() => setActiveRow('creative')}
        onClickCapture={() => setActiveRow('creative')}
        className="cs-row"
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
    </div>
  )
}
