import type { Principle, WorkflowStep } from '../types/os'

interface FounderOSProps {
  principles: Principle[]
  workflow: WorkflowStep[]
}

export function FounderOS({ principles, workflow }: FounderOSProps) {
  return (
    <div className="space-y-20">
      {/* Thinking Principles — 2×2 grid with stronger visual weight */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="eyebrow">Operating Principles</div>
          <span className="font-mono text-[10px] text-dim uppercase tracking-wider">{principles.length} modules</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden">
          {principles.map((p, idx) => (
            <div key={p.id} className="bg-surface p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg border border-cyan/20 bg-cyan/5 flex items-center justify-center text-cyan text-lg flex-shrink-0">
                  {p.icon}
                </div>
                <span className="font-mono text-[10px] text-dim">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-text">{p.title}</h3>
                <p className="mt-2 text-[13px] text-muted leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Workflow — pipeline with explicit AI annotation per step */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="eyebrow">Build Workflow</div>
          <span className="font-mono text-[10px] text-dim uppercase tracking-wider">{workflow.length} stages</span>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid gap-px bg-border rounded-xl overflow-hidden" style={{ gridTemplateColumns: `repeat(${workflow.length}, 1fr)` }}>
          {workflow.map((step) => (
            <div key={step.step} className="bg-surface p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] text-dim">{String(step.step).padStart(2, '0')}</span>
                <span className="chip-cyan text-[9px]">AI</span>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-text mb-2">{step.title}</div>
                <p className="text-[12px] text-muted leading-relaxed">{step.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-border">
                <div className="font-mono text-[9px] uppercase tracking-wider text-cyan mb-1.5">Claude role:</div>
                <div className="text-[11px] text-muted leading-relaxed">{step.aiRole}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden grid gap-px bg-border rounded-xl overflow-hidden">
          {workflow.map((step) => (
            <div key={step.step} className="bg-surface p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[11px] text-cyan">{String(step.step).padStart(2, '0')}</span>
                <div className="text-[14px] font-semibold text-text">{step.title}</div>
              </div>
              <p className="text-[12px] text-muted mb-3 leading-relaxed">{step.description}</p>
              <div className="text-[11px] text-cyan/70 font-mono">{step.aiRole}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
