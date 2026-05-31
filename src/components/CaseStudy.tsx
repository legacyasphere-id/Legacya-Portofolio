import { useState } from 'react'
import type { Project } from '../types/project'

interface CaseStudyProps {
  project: Project
  variant?: 'featured' | 'grid'
}

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  'in-progress': 'In Progress',
  archived: 'Archived',
}
const statusColor: Record<Project['status'], string> = {
  live: 'chip-green',
  'in-progress': 'chip-cyan',
  archived: 'chip',
}

export function CaseStudy({ project, variant = 'grid' }: CaseStudyProps) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [expanded, setExpanded] = useState(variant === 'featured')

  const nextSlide = () => setSlideIdx((i) => (i + 1) % project.screenshots.length)

  return (
    <article className="card-base overflow-hidden">
      {/* Screenshot */}
      <div
        className="relative overflow-hidden bg-raised cursor-pointer"
        style={{ minHeight: variant === 'featured' ? 300 : 200 }}
        onClick={nextSlide}
        role="button"
        aria-label="Cycle screenshots"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') nextSlide() }}
      >
        {project.screenshots.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-400"
            style={{ opacity: i === slideIdx ? 1 : 0 }}
            loading="lazy"
          />
        ))}
        {/* Slide dots */}
        {project.screenshots.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {project.screenshots.map((_, i) => (
              <span
                key={i}
                className="transition-all duration-200 rounded-full"
                style={{
                  width: i === slideIdx ? 16 : 5,
                  height: 5,
                  background: i === slideIdx ? '#22d3ee' : 'rgba(34,211,238,0.3)',
                }}
              />
            ))}
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 left-3 chip-cyan text-[10px]">★ Featured</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`${statusColor[project.status]} font-mono text-[10px] px-2 py-0.5 rounded border`}>
                {statusLabel[project.status]}
              </span>
              <span className="font-mono text-[10px] text-dim">{project.type}</span>
            </div>
            <h3 className="text-[20px] font-semibold text-text">{project.name}</h3>
            <p className="text-[13px] text-cyan mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener" className="text-dim text-[12px] hover:text-muted transition-colors">src →</a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener" className="text-cyan text-[12px] hover:text-text transition-colors">live →</a>
            )}
          </div>
        </div>

        {/* Case study toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-3 border-t border-border text-[12px] font-mono text-muted hover:text-cyan transition-colors"
        >
          <span>Case Study Breakdown</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {expanded && (
          <div className="mt-4 space-y-4">
            {(
              [
                ['Problem', project.caseStudy.problem, 'text-red-400'],
                ['Thinking Process', project.caseStudy.thinkingProcess, 'text-purple'],
                ['AI Role', project.caseStudy.aiRole, 'text-cyan'],
                ['Technical Execution', project.caseStudy.technicalExecution, 'text-text'],
                ['Outcome', project.caseStudy.outcome, 'text-green'],
              ] as [string, string, string][]
            ).map(([label, content, color]) => (
              <div key={label} className="border-l-2 border-border pl-4">
                <div className={`font-mono text-[10px] uppercase tracking-wider mb-1.5 ${color}`}>{label}</div>
                <p className="text-[13px] text-muted leading-relaxed">{content}</p>
              </div>
            ))}

            {/* Architecture */}
            {Object.keys(project.architecture).length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-dim mb-3">Architecture</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(project.architecture).map(([key, val]) => (
                    <div key={key} className="card-base p-2.5 text-center">
                      <div className="font-mono text-[10px] text-cyan mb-1 capitalize">{key}</div>
                      <div className="text-[11px] text-muted">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stack chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
