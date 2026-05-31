import type { Principle, WorkflowStep } from '../types/os'

interface FounderOSProps {
  principles: Principle[]
  workflow: WorkflowStep[]
}

export function FounderOS({ principles, workflow }: FounderOSProps) {
  return (
    <div className="space-y-16">
      {/* Principles */}
      <div>
        <div className="eyebrow mb-6">Thinking Principles</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((p) => (
            <div key={p.id} className="card-base p-6 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-cyan/20 bg-cyan/5 flex items-center justify-center text-cyan text-lg flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-text">{p.title}</h3>
                  <p className="mt-2 text-[13px] text-muted leading-relaxed">{p.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow pipeline */}
      <div>
        <div className="eyebrow mb-6">Build Workflow</div>

        {/* Desktop */}
        <div className="hidden lg:flex items-stretch gap-0">
          {workflow.map((step, idx) => (
            <div key={step.step} className="flex-1 flex items-stretch gap-0">
              <div className="flex-1 card-base p-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-dim mb-3">
                  {String(step.step).padStart(2, '0')}
                </div>
                <div className="text-[14px] font-semibold text-text mb-2">{step.title}</div>
                <p className="text-[12px] text-muted leading-relaxed mb-4">{step.description}</p>
                <div className="border-t border-border pt-3">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-cyan mb-1.5">AI Role:</div>
                  <div className="text-[11px] text-muted">{step.aiRole}</div>
                </div>
              </div>
              {idx < workflow.length - 1 && (
                <div className="flex items-center px-2 text-cyan/30">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-3">
          {workflow.map((step) => (
            <div key={step.step} className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[14px] font-semibold text-text">
                  <span className="font-mono text-cyan mr-2">{String(step.step).padStart(2, '0')}.</span>
                  {step.title}
                </div>
              </div>
              <p className="text-[12px] text-muted mb-3">{step.description}</p>
              <div className="text-[11px] text-cyan/70 font-mono">{step.aiRole}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
