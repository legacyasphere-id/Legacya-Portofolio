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

const breakdownSteps = (cs: Project['caseStudy']) =>
  [
    { key: 'problem',            label: 'Problem',           color: 'text-red-600',  accent: 'border-red-400/40' },
    { key: 'thinkingProcess',    label: 'Thinking Process',  color: 'text-purple',   accent: 'border-purple/30'  },
    { key: 'aiRole',             label: 'AI Role',           color: 'text-cyan',     accent: 'border-cyan/30'    },
    { key: 'architectureNote',   label: 'Architecture',      color: 'text-cyan',     accent: 'border-cyan/20'    },
    { key: 'technicalExecution', label: 'Execution',         color: 'text-text',     accent: 'border-border'     },
    { key: 'outcome',            label: 'Outcome',           color: 'text-green',    accent: 'border-green/30'   },
  ].map(s => ({ ...s, content: cs[s.key as keyof typeof cs] as string }))

export function CaseStudy({ project, variant = 'grid' }: CaseStudyProps) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const steps = breakdownSteps(project.caseStudy)
  const isFeatured = variant === 'featured'

  const nextSlide = () => setSlideIdx((i) => (i + 1) % project.screenshots.length)

  return (
    <article className="card-base overflow-hidden">
      {isFeatured ? (
        /* Featured: screenshot left, full analysis right */
        <div className="grid lg:grid-cols-12">
          {/* Screenshot panel */}
          <div
            className="lg:col-span-6 relative overflow-hidden bg-raised cursor-pointer"
            style={{ minHeight: 380 }}
            onClick={nextSlide}
            role="button"
            aria-label="Cycle screenshots"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') nextSlide() }}
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
            {project.screenshots.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.screenshots.map((_, i) => (
                  <span key={i} className="transition-all duration-200 rounded-full" style={{ width: i === slideIdx ? 16 : 5, height: 5, background: i === slideIdx ? '#B8956A' : 'rgba(184,149,106,0.3)' }} />
                ))}
              </div>
            )}
            <div className="absolute top-3 left-3 chip-cyan text-[10px]">★ Featured</div>
          </div>

          {/* Case study — always visible for featured */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col gap-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`${statusColor[project.status]} font-mono text-[10px] px-2 py-0.5 rounded border`}>{statusLabel[project.status]}</span>
                <span className="font-mono text-[10px] text-dim">{project.type}</span>
              </div>
              <h3 className="text-[22px] font-semibold text-text">{project.name}</h3>
              <p className="text-[13px] text-cyan mt-0.5">{project.tagline}</p>
              <div className="flex items-center gap-3 mt-3">
                {project.links.github && <a href={project.links.github} target="_blank" rel="noopener" className="text-dim text-[12px] hover:text-muted transition-colors">src →</a>}
                {project.links.live && <a href={project.links.live} target="_blank" rel="noopener" className="text-cyan text-[12px] hover:text-text transition-colors">live →</a>}
              </div>
            </div>

            {/* Full breakdown — always open for featured */}
            <div className="space-y-4 flex-1">
              {steps.map((step) => (
                <div key={step.key} className={`border-l-2 pl-4 ${step.accent}`}>
                  <div className={`font-mono text-[9px] uppercase tracking-wider mb-1 ${step.color}`}>{step.label}</div>
                  <p className="text-[12.5px] text-muted leading-relaxed">{step.content}</p>
                </div>
              ))}
            </div>

            {/* Architecture table */}
            {Object.keys(project.techStack).length > 0 && (
              <div className="border-t border-border pt-4">
                <div className="font-mono text-[9px] uppercase tracking-wider text-dim mb-3">Tech Stack</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(project.techStack).map(([key, val]) => (
                    <div key={key} className="card-base p-2.5">
                      <div className="font-mono text-[9px] text-cyan mb-1 capitalize">{key}</div>
                      <div className="text-[11px] text-muted leading-tight">{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
        </div>
      ) : (
        /* Grid variant: problem always visible, rest expandable */
        <>
          {/* Screenshot */}
          <div
            className="relative overflow-hidden bg-raised cursor-pointer"
            style={{ minHeight: 200 }}
            onClick={nextSlide}
            role="button"
            aria-label="Cycle screenshots"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') nextSlide() }}
          >
            {project.screenshots.map((s, i) => (
              <img key={s.src} src={s.src} alt={s.alt}
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-400"
                style={{ opacity: i === slideIdx ? 1 : 0 }} loading="lazy" />
            ))}
            {project.screenshots.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.screenshots.map((_, i) => (
                  <span key={i} className="transition-all duration-200 rounded-full" style={{ width: i === slideIdx ? 16 : 5, height: 5, background: i === slideIdx ? '#B8956A' : 'rgba(184,149,106,0.3)' }} />
                ))}
              </div>
            )}
          </div>

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${statusColor[project.status]} font-mono text-[10px] px-2 py-0.5 rounded border`}>{statusLabel[project.status]}</span>
                  <span className="font-mono text-[10px] text-dim">{project.type}</span>
                </div>
                <h3 className="text-[18px] font-semibold text-text">{project.name}</h3>
                <p className="text-[12px] text-cyan mt-0.5">{project.tagline}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                {project.links.github && <a href={project.links.github} target="_blank" rel="noopener" className="text-dim text-[11px] hover:text-muted transition-colors">src →</a>}
                {project.links.live && <a href={project.links.live} target="_blank" rel="noopener" className="text-cyan text-[11px] hover:text-text transition-colors">live →</a>}
              </div>
            </div>

            {/* Problem — always visible, no toggle needed */}
            <div className="border-l-2 border-red-400/30 pl-4 mb-4">
              <div className="font-mono text-[9px] uppercase tracking-wider text-red-400 mb-1">Problem</div>
              <p className="text-[12px] text-muted leading-relaxed">{project.caseStudy.problem}</p>
            </div>

            {/* Engineering Analysis toggle — reveals remaining steps */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between py-2.5 border-t border-border text-[11px] font-mono text-dim hover:text-cyan transition-colors"
            >
              <span>Engineering Breakdown · {steps.length - 1} steps</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {expanded && (
              <div className="mt-4 space-y-3">
                {steps.slice(1).map((step) => (
                  <div key={step.key} className={`border-l-2 pl-4 ${step.accent}`}>
                    <div className={`font-mono text-[9px] uppercase tracking-wider mb-1 ${step.color}`}>{step.label}</div>
                    <p className="text-[12px] text-muted leading-relaxed">{step.content}</p>
                  </div>
                ))}
                {Object.keys(project.techStack).length > 0 && (
                  <div className="border-t border-border pt-3">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-dim mb-2">Tech Stack</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(project.techStack).map(([key, val]) => (
                        <div key={key} className="card-base p-2">
                          <div className="font-mono text-[9px] text-cyan mb-0.5 capitalize">{key}</div>
                          <div className="text-[10px] text-muted leading-tight">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </div>
        </>
      )}
    </article>
  )
}
