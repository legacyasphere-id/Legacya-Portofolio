/**
 * Systems strip — a compact proof row directly below the hero. Surfaces the
 * four real products at a glance so credibility lands before any scrolling.
 * Colors stay on-brand (blue token system); labels use Geist Mono.
 */
interface SystemEntry {
  name: string
  meta: string
  state: 'live' | 'building'
}

const SYSTEMS: SystemEntry[] = [
  { name: 'InventoryOS', meta: 'Mini ERP · v1.4', state: 'live' },
  { name: 'AI-CV Screening', meta: 'AI Platform', state: 'live' },
  { name: 'Legacya POS', meta: 'POS · 9 Screens', state: 'live' },
  { name: 'BrightPath Dental', meta: 'Business OS', state: 'building' },
]

export function SystemsStrip() {
  return (
    <section className="border-y border-border bg-surface/60 px-5 py-8 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <p
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          data-animate
        >
          Live infrastructure — running in production
        </p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SYSTEMS.map((s, i) => (
            <div
              key={s.name}
              className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-4"
              data-animate
              data-delay={String(Math.min((i + 1) * 100, 500))}
            >
              <span
                className={`badge w-fit ${
                  s.state === 'live' ? 'badge-production' : 'badge-planned'
                }`}
              >
                <span className="badge-dot" />
                {s.state === 'live' ? 'Live' : 'Building'}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-text">
                {s.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {s.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
