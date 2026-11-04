import { useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CreativeWorkItem, Project } from '../types/project'

export interface CurveShowcaseCopy {
  digitalCaption: string
  creativeCaption: string
  prevProjectAria: string
  nextProjectAria: string
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
  copy?: CurveShowcaseCopy
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
  copy = DEFAULT_EN_COPY,
}: CurveShowcaseCardProps) {
  const [creativeIdx, setCreativeIdx] = useState(0)
  const [activeRow, setActiveRow] = useState<'digital' | 'creative'>('digital')

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
      className="relative mb-6 overflow-hidden rounded-[18px] border-2 border-[#1F6B66] bg-[#0A1114] px-3.5 py-6 text-white shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6B66] sm:px-8 sm:py-8"
      style={{
        backgroundImage:
          'radial-gradient(circle at 14% 12%, rgba(31, 107, 102, 0.25) 0%, rgba(10, 17, 20, 0) 58%)',
      }}
    >
      {/* Screen-reader polite announcement for active items */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {activeProject.name} · {activeCreativeMeta.shortTitle}
      </div>

      {/* ── TOP WAVE LINE: Digital Projects ── */}
      <div
        role="region"
        aria-label={copy.digitalCaption}
        onFocusCapture={() => setActiveRow('digital')}
        onClickCapture={() => setActiveRow('digital')}
        className="relative"
      >
        {/* Part 1: Top Caption */}
        <p className="text-center font-sans text-[14.5px] font-medium tracking-[-0.01em] text-white sm:text-[15.5px]">
          {copy.digitalCaption}
        </p>

        {/* Wave Track + 3 Project Photos + Prev/Next Buttons */}
        <div className="relative mt-2 h-[168px] w-full select-none sm:h-[210px]">
          {/* Part 2: Top Curved White Line (Desktop SVG) */}
          <svg
            viewBox="0 0 1000 210"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          >
            <path
              d="M 38 42 C 195 140, 355 142, 500 120 C 655 96, 820 74, 962 28"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Part 2: Top Curved White Line (Phone SVG) */}
          <svg
            viewBox="0 0 360 168"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full sm:hidden"
          >
            <path
              d="M 22 36 C 95 104, 145 108, 180 96 C 225 82, 285 56, 338 22"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Part 5: Previous Button (Top Left on Curve) */}
          <button
            type="button"
            onClick={() => stepProject(-1)}
            aria-label={copy.prevProjectAria}
            className="absolute left-1 top-[14px] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-[#0A1114] shadow-md transition-transform duration-150 hover:scale-105 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-3 sm:top-[18px]"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
          </button>

          {/* Part 4: Previous Neighbor Photo (Left on Curve) */}
          {prevProject && (
            <button
              type="button"
              onClick={() => onSelectProject(prevProject.id)}
              aria-label={`${copy.selectProjectAriaPrefix}: ${prevProject.name}`}
              className="group absolute left-[13.5%] top-[55%] z-10 flex min-h-[44px] min-w-[56px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/35 bg-[#0A1114] p-0.5 shadow-md transition-all duration-200 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-[18.5%] sm:top-[56%] sm:rounded-xl"
            >
              <img
                src={prevProject.screenshots[0]?.src}
                alt={prevProject.screenshots[0]?.alt ?? prevProject.name}
                loading="lazy"
                decoding="async"
                className="h-[40px] w-[58px] rounded-[6px] object-cover object-top opacity-55 transition-opacity duration-200 group-hover:opacity-90 sm:h-[74px] sm:w-[118px] sm:rounded-[9px]"
              />
            </button>
          )}

          {/* Part 3: Active Project Photo (Centered on Curve) */}
          <button
            type="button"
            aria-current="true"
            onClick={() => onInspectActiveProject(activeProject.id)}
            aria-label={`${copy.inspectProjectAriaPrefix}: ${activeProject.name}`}
            className="group absolute left-1/2 top-[55%] z-20 flex min-h-[88px] min-w-[138px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-2 border-white bg-[#0A1114] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:top-[54%] sm:rounded-2xl"
          >
            <img
              src={activeProject.screenshots[0]?.src}
              alt={activeProject.screenshots[0]?.alt ?? activeProject.name}
              loading={projectIdx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-[84px] w-[134px] rounded-[9px] object-cover object-top sm:h-[132px] sm:w-[224px] sm:rounded-xl"
            />
          </button>

          {/* Part 4: Next Neighbor Photo (Right on Curve) */}
          {nextProject && (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject.id)}
              aria-label={`${copy.selectProjectAriaPrefix}: ${nextProject.name}`}
              className="group absolute left-[86.5%] top-[36%] z-10 flex min-h-[44px] min-w-[56px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/35 bg-[#0A1114] p-0.5 shadow-md transition-all duration-200 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-[81.5%] sm:top-[36%] sm:rounded-xl"
            >
              <img
                src={nextProject.screenshots[0]?.src}
                alt={nextProject.screenshots[0]?.alt ?? nextProject.name}
                loading="lazy"
                decoding="async"
                className="h-[40px] w-[58px] rounded-[6px] object-cover object-top opacity-55 transition-opacity duration-200 group-hover:opacity-90 sm:h-[74px] sm:w-[118px] sm:rounded-[9px]"
              />
            </button>
          )}

          {/* Part 5: Next Button (Top Right on Curve) */}
          <button
            type="button"
            onClick={() => stepProject(1)}
            aria-label={copy.nextProjectAria}
            className="absolute right-1 top-[2px] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-[#0A1114] shadow-md transition-transform duration-150 hover:scale-105 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:right-3 sm:top-[6px]"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
          </button>
        </div>

        {/* Active Project Metadata under the photo (Name + 1 line + Badge #6 + Counter #7) */}
        <div className="mx-auto mt-1 flex max-w-[460px] flex-col items-center text-center">
          <p className="font-sans text-[15.5px] font-semibold tracking-[-0.01em] text-white sm:text-[17px]">
            {activeProject.name}
          </p>
          <p className="mt-0.5 line-clamp-1 font-sans text-[12.5px] text-white/75 sm:text-[13.5px]">
            {activeProject.tagline}.
          </p>
          <span className="mt-2 inline-block rounded-full border border-white/25 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[9.5px] text-white/90 sm:px-3 sm:text-[10.5px]">
            {activeProject.workClassification}
          </span>
          <span className="mt-1 font-mono text-[11px] text-white/65 tabular-nums">
            {projectIdx + 1} / {totalProjects}
          </span>
        </div>
      </div>

      {/* Clean Spacing Between Mirrored Waves */}
      <div className="my-4 sm:my-6" />

      {/* ── BOTTOM WAVE LINE: Creative Campaign Items ── */}
      <div
        role="region"
        aria-label={copy.creativeCaption}
        onFocusCapture={() => setActiveRow('creative')}
        onClickCapture={() => setActiveRow('creative')}
        className="relative"
      >
        {/* Wave Track + 3 Creative Poster Photos + Prev/Next Buttons */}
        <div className="relative h-[168px] w-full select-none sm:h-[210px]">
          {/* Part 2: Bottom Mirrored Curved White Line (Desktop SVG) */}
          <svg
            viewBox="0 0 1000 210"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          >
            <path
              d="M 38 174 C 175 94, 345 78, 500 94 C 660 110, 825 148, 962 84"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Part 2: Bottom Mirrored Curved White Line (Phone SVG) */}
          <svg
            viewBox="0 0 360 168"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full sm:hidden"
          >
            <path
              d="M 22 144 C 92 84, 145 72, 180 82 C 225 94, 285 118, 338 72"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Part 5: Previous Button (Bottom Left on Curve) */}
          <button
            type="button"
            onClick={() => stepCreative(-1)}
            aria-label={copy.prevProjectAria}
            className="absolute left-1 top-[118px] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-[#0A1114] shadow-md transition-transform duration-150 hover:scale-105 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-3 sm:top-[144px]"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
          </button>

          {/* Part 4: Previous Creative Photo (Left on Curve) */}
          {prevCreative && (
            <button
              type="button"
              onClick={() => setCreativeIdx(prevCreativeIdx)}
              aria-label={`${copy.selectCreativeAriaPrefix}: ${prevCreativeMeta.shortTitle}`}
              className="group absolute left-[13.5%] top-[55%] z-10 flex min-h-[48px] min-w-[52px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/35 bg-[#0A1114] p-0.5 shadow-md transition-all duration-200 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-[18.5%] sm:top-[52%] sm:rounded-xl"
            >
              <img
                src={prevCreative.previewImage}
                alt={prevCreative.title}
                loading="lazy"
                decoding="async"
                className="h-[46px] w-[50px] rounded-[6px] object-cover opacity-55 transition-opacity duration-200 group-hover:opacity-90 sm:h-[88px] sm:w-[92px] sm:rounded-[9px]"
              />
            </button>
          )}

          {/* Part 3: Active Creative Photo (Centered on Curve) */}
          <button
            type="button"
            aria-current="true"
            onClick={() => onOpenCreativeItem(activeCreative.id)}
            aria-label={`${copy.openCreativeAriaPrefix}: ${activeCreative.title}`}
            className="group absolute left-1/2 top-[48%] z-20 flex min-h-[88px] min-w-[138px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-2 border-white bg-[#0A1114] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:top-[47%] sm:rounded-2xl"
          >
            <img
              src={activeCreative.previewImage}
              alt={activeCreative.title}
              loading="lazy"
              decoding="async"
              className="h-[84px] w-[134px] rounded-[9px] object-cover sm:h-[132px] sm:w-[214px] sm:rounded-xl"
            />
          </button>

          {/* Part 4: Next Creative Photo (Right on Curve) */}
          {nextCreative && (
            <button
              type="button"
              onClick={() => setCreativeIdx(nextCreativeIdx)}
              aria-label={`${copy.selectCreativeAriaPrefix}: ${nextCreativeMeta.shortTitle}`}
              className="group absolute left-[86.5%] top-[64%] z-10 flex min-h-[48px] min-w-[52px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg border border-white/35 bg-[#0A1114] p-0.5 shadow-md transition-all duration-200 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:left-[81.5%] sm:top-[64%] sm:rounded-xl"
            >
              <img
                src={nextCreative.previewImage}
                alt={nextCreative.title}
                loading="lazy"
                decoding="async"
                className="h-[46px] w-[50px] rounded-[6px] object-cover opacity-55 transition-opacity duration-200 group-hover:opacity-90 sm:h-[88px] sm:w-[92px] sm:rounded-[9px]"
              />
            </button>
          )}

          {/* Part 5: Next Button (Bottom Right on Curve) */}
          <button
            type="button"
            onClick={() => stepCreative(1)}
            aria-label={copy.nextProjectAria}
            className="absolute right-1 top-[52px] z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-white text-[#0A1114] shadow-md transition-transform duration-150 hover:scale-105 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:right-3 sm:top-[64px]"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.25]" aria-hidden="true" />
          </button>
        </div>

        {/* Active Creative Metadata under the photo (Title + 1 line + Badge #6 + Counter #7) */}
        <div className="mx-auto mt-1 flex max-w-[460px] flex-col items-center text-center">
          <p className="font-sans text-[15.5px] font-semibold tracking-[-0.01em] text-white sm:text-[17px]">
            {activeCreativeMeta.shortTitle}
          </p>
          <p className="mt-0.5 line-clamp-1 font-sans text-[12.5px] text-white/75 sm:text-[13.5px]">
            {activeCreativeMeta.oneLine}.
          </p>
          <span className="mt-2 inline-block rounded-full border border-white/25 bg-white/[0.06] px-2.5 py-0.5 font-mono text-[9.5px] text-white/90 sm:px-3 sm:text-[10.5px]">
            {copy.conceptBadge}
          </span>
          <span className="mt-1 font-mono text-[11px] text-white/65 tabular-nums">
            {safeCreativeIdx + 1} / {totalCreative}
          </span>
        </div>

        {/* Part 1: Bottom Caption */}
        <p className="mt-4 text-center font-sans text-[14.5px] font-medium tracking-[-0.01em] text-white sm:mt-5 sm:text-[15.5px]">
          {copy.creativeCaption}
        </p>
      </div>
    </div>
  )
}
