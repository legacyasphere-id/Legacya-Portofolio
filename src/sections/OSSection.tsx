import { founderOS } from '../core/founder-os'
import { FounderOS } from '../components/FounderOS'

export function OSSection() {
  return (
    <section id="founder-os" className="section-divider">
      {/* OS system header bar — makes this feel like entering a dashboard, not reading a section */}
      <div className="border-b border-border" style={{ background: '#EDE6D6' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Founder OS</span>
            <span className="font-mono text-[10px] text-border">·</span>
            <span className="font-mono text-[10px] text-cyan">v{founderOS.version}</span>
            <span className="font-mono text-[10px] text-border">·</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-dim">Primary System</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot-green animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-green">Active</span>
          </div>
        </div>
      </div>

      {/* Main content — generous spacing to signal dominance */}
      <div className="py-24 sm:py-40" style={{ background: '#EDE6D6' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="eyebrow mb-5">01 — Founder OS</div>

          {/* Section header — larger than other sections to establish dominance */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold tracking-tight leading-[1.05] text-text">
                Not a portfolio.{' '}
                <span className="text-gradient-cyan">A system.</span>
              </h2>
              <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
                {founderOS.tagline}
              </p>
            </div>
            {/* System metadata */}
            <div className="card-base px-5 py-4 flex-shrink-0 space-y-2 lg:text-right">
              <div className="font-mono text-[10px] uppercase tracking-wider text-dim">System</div>
              <div className="font-mono text-[13px] text-text">Founder OS v{founderOS.version}</div>
              <div className="font-mono text-[10px] text-muted">{founderOS.principles.length} principles · {founderOS.workflow.length} workflow stages</div>
            </div>
          </div>

          <FounderOS principles={founderOS.principles} workflow={founderOS.workflow} />
        </div>
      </div>
    </section>
  )
}
