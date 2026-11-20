import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type {
  CreativeWorkItem,
  MotionWorkItem,
  PostReadyWorkItem,
  Project,
} from '../types/project'
import { triggerProjectScope } from '../core/identity'

export interface CurveShowcaseCopy {
  digitalCaption: string
  creativeCaption: string
  motionCaption: string
  systemsCaption: string
  rawVisualsCaption: string
  postReadyCaption: string
  filmsCaption: string
  motionHomeCaption: string
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
  openPostReadyAriaPrefix: string
  selectPostReadyAriaPrefix: string
  openMotionAriaPrefix: string
  selectMotionAriaPrefix: string
}

const DEFAULT_EN_COPY: CurveShowcaseCopy = {
  digitalCaption: 'My live websites and business systems',
  creativeCaption: 'My campaign visuals and product films',
  motionCaption: 'My motion animation studies',
  systemsCaption: 'Systems and Websites',
  rawVisualsCaption: 'Ad Asset Creation: Raw visuals',
  postReadyCaption: 'Ad Asset Creation: Post-ready posts',
  filmsCaption: 'Cinematic Films',
  motionHomeCaption: 'Motion Animation (in development)',
  prevProjectAria: 'Previous project',
  nextProjectAria: 'Next project',
  previousLabel: 'Previous',
  nextLabel: 'Next project',
  conceptBadge: 'Concept work · not commissioned by the brand',
  motionPreparingBadge: 'Motion studies · source files being prepared',
  motionMountLabel: 'In development',
  requestMotionCta: 'Request Motion Animation',
  inspectProjectAriaPrefix: 'View details for',
  selectProjectAriaPrefix: 'Select project',
  openCreativeAriaPrefix: 'Open campaign study for',
  selectCreativeAriaPrefix: 'Select campaign study',
  openPostReadyAriaPrefix: 'Inspect post-ready concept for',
  selectPostReadyAriaPrefix: 'Select post-ready concept',
  openMotionAriaPrefix: 'Open motion study for',
  selectMotionAriaPrefix: 'Select motion study',
}

type ActiveRowId =
  | 'digital'
  | 'creative'
  | 'raw-visuals'
  | 'post-ready'
  | 'films'
  | 'motion'

interface CurveShowcaseCardProps {
  layout?: 'work' | 'home'
  projects: Project[]
  activeProjectId: string
  onSelectProject: (projectId: string) => void
  onInspectActiveProject: (projectId: string) => void
  creativeItems: CreativeWorkItem[]
  onOpenCreativeItem: (itemId: string) => void
  initialCreativeId?: string
  rawVisualItems?: CreativeWorkItem[]
  postReadyItems?: PostReadyWorkItem[]
  onOpenPostReadyItem?: (itemId: string) => void
  filmItems?: CreativeWorkItem[]
  motionItems?: MotionWorkItem[]
  onOpenMotionItem?: (itemId: string) => void
  initialMotionId?: string
  copy?: Partial<CurveShowcaseCopy>
}

interface CurveSlide {
  id: string
  image: string
  alt: string
  title: string
  subtitle: string
  badge: string
  selectAria: string
  openAria: string
  imgClassName?: string
  contain?: boolean
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

interface CurveRowProps {
  id?: string
  testId: string
  caption: string
  slides: CurveSlide[]
  activeIndex: number
  onStep: (delta: number) => void
  onOpenActive: (slideId: string) => void
  onActivateRow: () => void
  copy: CurveShowcaseCopy
  eagerFirst?: boolean
  className?: string
}

function CurveRow({
  id,
  testId,
  caption,
  slides,
  activeIndex,
  onStep,
  onOpenActive,
  onActivateRow,
  copy,
  eagerFirst = false,
  className = '',
}: CurveRowProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const total = slides.length
  if (total === 0) return null

  const safeIdx = ((activeIndex % total) + total) % total
  const active = slides[safeIdx]
  const hasMultiple = total > 1
  const prev = hasMultiple ? slides[(safeIdx - 1 + total) % total] : undefined
  const next = hasMultiple ? slides[(safeIdx + 1) % total] : undefined

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple || e.touches.length !== 1) return
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start || !hasMultiple || e.changedTouches.length === 0) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
      onActivateRow()
      onStep(dx < 0 ? 1 : -1)
    }
  }

  return (
    <div
      id={id}
      data-testid={testId}
      role="region"
      tabIndex={0}
      aria-label={caption}
      onFocusCapture={onActivateRow}
      onClickCapture={onActivateRow}
      className={`cs-row focus:outline-none ${className}`.trim()}
    >
      <p className="cs-cap">{caption}</p>

      <div
        className="cs-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {prev && (
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label={prev.selectAria}
            className={`cs-c cs-side cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep ${
              prev.contain ? 'cs-c--contain' : ''
            }`.trim()}
          >
            <img
              src={prev.image}
              alt={prev.alt}
              loading="lazy"
              decoding="async"
              className={prev.imgClassName}
            />
          </button>
        )}

        <button
          type="button"
          aria-current="true"
          onClick={() => onOpenActive(active.id)}
          aria-label={active.openAria}
          className={`cs-c cs-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep ${
            active.contain ? 'cs-c--contain' : ''
          }`.trim()}
        >
          <img
            src={active.image}
            alt={active.alt}
            loading={eagerFirst && safeIdx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={active.imgClassName}
          />
        </button>

        {next && (
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label={next.selectAria}
            className={`cs-c cs-side cs-nx focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep ${
              next.contain ? 'cs-c--contain' : ''
            }`.trim()}
          >
            <img
              src={next.image}
              alt={next.alt}
              loading="lazy"
              decoding="async"
              className={next.imgClassName}
            />
          </button>
        )}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => onStep(-1)}
              aria-label={copy.prevProjectAria}
              className="cs-btn cs-pl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onStep(1)}
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
          </>
        )}
      </div>

      <div className="cs-info">
        <b className="cs-title">{active.title}</b>
        <p className="cs-ln">{active.subtitle}</p>
        <span className="cs-badge">{active.badge}</span>
        <div className="cs-cnt">
          {safeIdx + 1} / {total}
        </div>
      </div>
    </div>
  )
}

export function CurveShowcaseCard({
  layout = 'work',
  projects,
  activeProjectId,
  onSelectProject,
  onInspectActiveProject,
  creativeItems,
  onOpenCreativeItem,
  initialCreativeId,
  rawVisualItems = [],
  postReadyItems = [],
  onOpenPostReadyItem,
  filmItems = [],
  motionItems = [],
  onOpenMotionItem,
  initialMotionId,
  copy: customCopy,
}: CurveShowcaseCardProps) {
  const copy: CurveShowcaseCopy = { ...DEFAULT_EN_COPY, ...customCopy }
  const isHome = layout === 'home'

  const [creativeIdx, setCreativeIdx] = useState(() => {
    if (!initialCreativeId) return 0
    const idx = creativeItems.findIndex(
      (item) => item.id === initialCreativeId || item.category === initialCreativeId,
    )
    return idx >= 0 ? idx : 0
  })
  const [rawVisualIdx, setRawVisualIdx] = useState(0)
  const [postReadyIdx, setPostReadyIdx] = useState(0)
  const [filmIdx, setFilmIdx] = useState(0)
  const [motionIdx, setMotionIdx] = useState(() => {
    if (!initialMotionId) return 0
    const idx = motionItems.findIndex((item) => item.id === initialMotionId)
    return idx >= 0 ? idx : 0
  })
  const [activeRow, setActiveRow] = useState<ActiveRowId>(() => {
    if (initialMotionId) return 'motion'
    if (initialCreativeId) return isHome ? 'raw-visuals' : 'creative'
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
  const activeProject = projects[projectIdx]

  const stepProject = (delta: number) => {
    if (totalProjects === 0) return
    const nextIdx = (projectIdx + delta + totalProjects) % totalProjects
    const nextItem = projects[nextIdx]
    if (nextItem) onSelectProject(nextItem.id)
  }

  const stepCreative = (delta: number) => {
    if (creativeItems.length === 0) return
    setCreativeIdx((prev) => (prev + delta + creativeItems.length) % creativeItems.length)
  }

  const stepRawVisual = (delta: number) => {
    if (rawVisualItems.length === 0) return
    setRawVisualIdx((prev) => (prev + delta + rawVisualItems.length) % rawVisualItems.length)
  }

  const stepPostReady = (delta: number) => {
    if (postReadyItems.length === 0) return
    setPostReadyIdx((prev) => (prev + delta + postReadyItems.length) % postReadyItems.length)
  }

  const stepFilm = (delta: number) => {
    if (filmItems.length === 0) return
    setFilmIdx((prev) => (prev + delta + filmItems.length) % filmItems.length)
  }

  const stepMotion = (delta: number) => {
    if (motionItems.length === 0) return
    setMotionIdx((prev) => (prev + delta + motionItems.length) % motionItems.length)
  }

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const delta = e.key === 'ArrowRight' ? 1 : -1
    if (activeRow === 'motion') {
      stepMotion(delta)
    } else if (activeRow === 'creative') {
      stepCreative(delta)
    } else if (activeRow === 'raw-visuals') {
      stepRawVisual(delta)
    } else if (activeRow === 'post-ready') {
      stepPostReady(delta)
    } else if (activeRow === 'films') {
      stepFilm(delta)
    } else {
      stepProject(delta)
    }
  }

  if (!activeProject) return null

  const projectSlides: CurveSlide[] = projects.map((project) => ({
    id: project.id,
    image: project.screenshots[0]?.src ?? '',
    alt: project.screenshots[0]?.alt ?? project.name,
    title: project.name,
    subtitle: project.tagline,
    badge: project.workClassification,
    selectAria: `${copy.selectProjectAriaPrefix}: ${project.name}`,
    openAria: `${copy.inspectProjectAriaPrefix}: ${project.name}`,
    imgClassName: 'object-top',
  }))

  const toCreativeSlides = (items: CreativeWorkItem[]): CurveSlide[] =>
    items.map((item) => {
      const meta = splitCreativeTitle(item)
      return {
        id: item.id,
        image: item.previewImage ?? '',
        alt: item.title,
        title: meta.shortTitle,
        subtitle: meta.oneLine,
        badge: copy.conceptBadge,
        selectAria: `${copy.selectCreativeAriaPrefix}: ${meta.shortTitle}`,
        openAria: `${copy.openCreativeAriaPrefix}: ${item.title}`,
      }
    })

  const postReadySlides: CurveSlide[] = postReadyItems.map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
    title: item.brand,
    subtitle: item.title,
    badge: copy.conceptBadge,
    selectAria: `${copy.selectPostReadyAriaPrefix}: ${item.brand}`,
    openAria: `${copy.openPostReadyAriaPrefix}: ${item.brand}`,
    contain: true,
  }))

  const motionSlides: CurveSlide[] = motionItems.map((item) => ({
    id: item.id,
    image: item.posterImage ?? '',
    alt: item.title,
    title: item.title,
    subtitle: item.subtitle,
    badge: copy.conceptBadge,
    selectAria: `${copy.selectMotionAriaPrefix}: ${item.title}`,
    openAria: `${copy.openMotionAriaPrefix}: ${item.title}`,
  }))

  const creativeSlides = toCreativeSlides(creativeItems)
  const rawVisualSlides = toCreativeSlides(rawVisualItems)
  const filmSlides = toCreativeSlides(filmItems)

  const activeCreative =
    creativeSlides.length > 0
      ? creativeSlides[((creativeIdx % creativeSlides.length) + creativeSlides.length) % creativeSlides.length]
      : undefined
  const activeMotion =
    motionSlides.length > 0
      ? motionSlides[((motionIdx % motionSlides.length) + motionSlides.length) % motionSlides.length]
      : undefined

  const motionCaption = isHome ? copy.motionHomeCaption : copy.motionCaption

  return (
    <div
      data-testid="curve-showcase-card"
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      className={`cs-card mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-deep ${
        isHome ? 'cs-card--home' : ''
      }`.trim()}
    >
      {/* Screen-reader polite announcement for active items */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeProject.name} ·{' '}
        {isHome
          ? `${rawVisualSlides[rawVisualIdx % Math.max(1, rawVisualSlides.length)]?.title ?? ''} · ${postReadySlides[postReadyIdx % Math.max(1, postReadySlides.length)]?.title ?? ''} · ${filmSlides[filmIdx % Math.max(1, filmSlides.length)]?.title ?? ''}`
          : activeCreative?.title ?? ''}{' '}
        · {activeMotion ? activeMotion.title : copy.motionMountLabel}
      </div>

      {/* ── ROW 1: Digital Projects / Systems and Websites ── */}
      <CurveRow
        testId="curve-row-digital"
        caption={isHome ? copy.systemsCaption : copy.digitalCaption}
        slides={projectSlides}
        activeIndex={projectIdx}
        onStep={stepProject}
        onOpenActive={onInspectActiveProject}
        onActivateRow={() => setActiveRow('digital')}
        copy={copy}
        eagerFirst
      />

      {isHome ? (
        <>
          {/* ── ROW 2 (Home): Ad Asset Creation: Raw visuals ── */}
          <CurveRow
            testId="curve-row-raw-visuals"
            caption={copy.rawVisualsCaption}
            slides={rawVisualSlides}
            activeIndex={rawVisualIdx}
            onStep={stepRawVisual}
            onOpenActive={onOpenCreativeItem}
            onActivateRow={() => setActiveRow('raw-visuals')}
            copy={copy}
          />

          {/* ── ROW 3 (Home): Ad Asset Creation: Post-ready posts ── */}
          <CurveRow
            testId="curve-row-post-ready"
            caption={copy.postReadyCaption}
            slides={postReadySlides}
            activeIndex={postReadyIdx}
            onStep={stepPostReady}
            onOpenActive={(itemId) => onOpenPostReadyItem?.(itemId)}
            onActivateRow={() => setActiveRow('post-ready')}
            copy={copy}
          />

          {/* ── ROW 4 (Home): Cinematic Films (0 <video> mounted until clicked) ── */}
          <CurveRow
            testId="curve-row-films"
            caption={copy.filmsCaption}
            slides={filmSlides}
            activeIndex={filmIdx}
            onStep={stepFilm}
            onOpenActive={onOpenCreativeItem}
            onActivateRow={() => setActiveRow('films')}
            copy={copy}
          />
        </>
      ) : (
        /* ── ROW 2 (/work): Combined Creative Campaign Items ── */
        <CurveRow
          testId="curve-row-creative"
          caption={copy.creativeCaption}
          slides={creativeSlides}
          activeIndex={creativeIdx}
          onStep={stepCreative}
          onOpenActive={onOpenCreativeItem}
          onActivateRow={() => setActiveRow('creative')}
          copy={copy}
        />
      )}

      {/* ── FINAL ROW: Motion Animation Studies ── */}
      {motionSlides.length > 0 ? (
        <CurveRow
          id="motion-work"
          testId="curve-row-motion"
          caption={motionCaption}
          slides={motionSlides}
          activeIndex={motionIdx}
          onStep={stepMotion}
          onOpenActive={(motionId) => {
            // TODO(yoga): Open motion study details modal or view once motion items are added
            onOpenMotionItem?.(motionId)
          }}
          onActivateRow={() => setActiveRow('motion')}
          copy={copy}
          className="scroll-mt-24"
        />
      ) : (
        <div
          id="motion-work"
          data-testid="curve-row-motion"
          role="region"
          tabIndex={0}
          aria-label={motionCaption}
          onFocusCapture={() => setActiveRow('motion')}
          onClickCapture={() => setActiveRow('motion')}
          className="cs-row scroll-mt-24 focus:outline-none"
        >
          <p className="cs-cap">{motionCaption}</p>

          <div className={`cs-stage ${isHome ? 'cs-stage--compact' : ''}`.trim()}>
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
        </div>
      )}
    </div>
  )
}
