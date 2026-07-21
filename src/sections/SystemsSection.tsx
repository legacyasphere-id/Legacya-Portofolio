const SYSTEMS = [
  {
    title: 'Business Operating Systems',
    description:
      'Centralized platforms that help businesses manage operations efficiently, replacing scattered spreadsheets and disconnected tools with one source of truth.',
    points: ['Internal platforms', 'Role-based access', 'Centralized data'],
    glyph: (
      <>
        <rect x="6" y="6" width="36" height="36" rx="7" />
        <path d="M6 18h36M18 18v24" />
      </>
    ),
  },
  {
    title: 'Operational Dashboards',
    description:
      'Real-time visibility into performance, processes, and decision-making, so leaders can see what is happening across the business at a glance.',
    points: ['Live metrics', 'Performance views', 'Decision support'],
    glyph: (
      <>
        <rect x="6" y="6" width="36" height="36" rx="7" />
        <path d="M13 30l7-8 6 5 9-12" />
      </>
    ),
  },
  {
    title: 'Automation Infrastructure',
    description:
      'Systems that reduce repetitive work and streamline operations, connecting tools, moving data, and removing manual steps from daily workflows.',
    points: ['Workflow automation', 'Tool integrations', 'API pipelines'],
    glyph: (
      <>
        <circle cx="14" cy="14" r="5" />
        <circle cx="34" cy="34" r="5" />
        <path d="M14 19v9a6 6 0 006 6h9" />
      </>
    ),
  },
]

export function SystemsSection() {
  return (
    <section id="systems" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-14 max-w-[44ch]" data-animate>
          <p className="eyebrow mb-4">What We Build</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            Systems we build
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            Operational infrastructure designed around how your business
            actually runs, not generic software.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SYSTEMS.map((system, i) => (
            <article
              key={system.title}
              className="card card-hover flex flex-col p-7 md:p-8"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg">
                <svg
                  viewBox="0 0 48 48"
                  className="h-6 w-6 stroke-blue-deep"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {system.glyph}
                </svg>
              </span>

              <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em]">
                {system.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                {system.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
                {system.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[13.5px] text-muted"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
