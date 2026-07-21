import {
  osStatus,
  OS_STATUS_LABEL,
  type OSStatusLevel,
  type RoadmapPhase,
} from '../data/osStatus'

const BADGE_CLASS: Record<OSStatusLevel, string> = {
  active: 'badge-active',
  production: 'badge-production',
  research: 'badge-research',
  planned: 'badge-planned',
}

const PHASE_ORDER: Record<RoadmapPhase, number> = {
  Next: 0,
  Later: 1,
  Exploring: 2,
}

export function OSStatusSection() {
  const board = osStatus.filter((item) => item.status !== 'planned')
  const roadmap = osStatus
    .filter((item) => item.status === 'planned')
    .sort(
      (a, b) =>
        PHASE_ORDER[a.phase ?? 'Later'] - PHASE_ORDER[b.phase ?? 'Later'],
    )

  return (
    <section
      id="os-status"
      className="border-t border-border bg-surface/50 px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44ch]" data-animate>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              Last updated · July 10, 2026
            </p>
            <p className="eyebrow mb-4">System Board</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
              OS Status
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
              What&rsquo;s live across the studio today, and what&rsquo;s next
              on the roadmap. The frameworks and infrastructure we build on.
            </p>
          </div>

          <div
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
            data-animate
            data-delay="100"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-deep" />
            Live
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-bg">
          {board.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col gap-3 p-5 transition-colors duration-300 hover:bg-surface md:flex-row md:items-center md:gap-6 md:p-6 ${
                i !== 0 ? 'border-t border-border' : ''
              }`}
              data-animate
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-3">
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em]">
                  {item.name}
                </h3>
                {item.version && (
                  <span className="font-mono text-[11px] text-dim">
                    {item.version}
                  </span>
                )}
              </div>

              <p className="min-w-0 flex-[2] text-[13.5px] leading-relaxed text-muted">
                {item.detail}
              </p>

              <div className="flex shrink-0 items-center gap-3 md:w-44 md:justify-end">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim md:hidden">
                  {item.category}
                </span>
                <span className={`badge ${BADGE_CLASS[item.status]}`}>
                  <span className="badge-dot" />
                  {OS_STATUS_LABEL[item.status]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Roadmap ─────────────────────────────────────────────────────
            Planned items, reframed as a forward-looking horizon rather than a
            flat "planned" badge. */}
        {roadmap.length > 0 && (
          <div className="mt-16">
            <div className="mb-7 flex items-center gap-3" data-animate>
              <p className="eyebrow">Roadmap</p>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                What&rsquo;s next
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {roadmap.map((item, i) => (
                <div
                  key={item.id}
                  className="card flex flex-col p-6"
                  data-animate
                  data-delay={String(Math.min((i + 1) * 100, 500))}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-deep">
                      {item.phase ?? 'Later'}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
