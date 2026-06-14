const LAYERS = [
  {
    label: 'Business Core',
    note: 'Goals, teams, customers',
    tone: 'human',
  },
  {
    label: 'Operations',
    note: 'Daily processes & workflows',
    tone: 'human',
  },
  {
    label: 'Systems',
    note: 'Platforms & dashboards',
    tone: 'system',
  },
  {
    label: 'Automation',
    note: 'Repetitive work removed',
    tone: 'system',
  },
  {
    label: 'Intelligence',
    note: 'Visibility & better decisions',
    tone: 'system',
  },
]

/**
 * Layered systems visualization — communicates how a business evolves from
 * manual operations (cream/human layers) into scalable, intelligent systems
 * (blue layers). A pulse travels the spine to suggest continuous data flow.
 */
export function SystemDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]" aria-hidden="true">
      <div className="relative flex flex-col gap-3 py-2">
        <div className="flow-spine" />
        <div className="flow-pulse" />

        {LAYERS.map((layer, i) => {
          const isSystem = layer.tone === 'system'
          return (
            <div
              key={layer.label}
              className="relative z-10 flex items-center gap-4"
              data-animate
              data-delay={String(Math.min((i + 1) * 100, 500))}
            >
              {/* Left rail label */}
              <div className="hidden w-20 shrink-0 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-dim sm:block">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Node */}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <span
                  className={`node-ping h-3 w-3 rounded-full border ${
                    isSystem
                      ? 'border-blue-deep bg-blue/30'
                      : 'border-border bg-surface'
                  }`}
                />
              </div>

              {/* Card */}
              <div
                className={`flex flex-1 items-center justify-between rounded-xl border px-4 py-3 ${
                  isSystem
                    ? 'border-blue/30 bg-surface'
                    : 'border-border bg-surface/70'
                }`}
              >
                <div>
                  <p
                    className={`text-[14px] font-semibold tracking-tight ${
                      isSystem ? 'text-blue-deep' : 'text-text'
                    }`}
                  >
                    {layer.label}
                  </p>
                  <p className="text-[11.5px] text-muted">{layer.note}</p>
                </div>
                {isSystem && (
                  <span className="badge badge-active hidden shrink-0 sm:inline-flex">
                    <span className="badge-dot" />
                    System
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
