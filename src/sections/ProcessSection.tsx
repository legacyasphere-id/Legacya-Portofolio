const STEPS = [
  {
    n: '01.',
    title: 'Discover & Audit',
    deliverable: 'Workflow Bottleneck Map & System Spec',
    detail:
      'We audit how data, approvals, and tasks actually move across your team today—identifying where spreadsheets, manual entry, or disconnected tools create friction.',
  },
  {
    n: '02.',
    title: 'Architect First',
    deliverable: 'PostgreSQL Schema, Roles & AI Boundaries',
    detail:
      'Before writing UI code, we define the database entities, Row-Level Security permissions, transaction rules, and deterministic AI boundaries.',
  },
  {
    n: '03.',
    title: 'Co-Engineered Build',
    deliverable: 'Staging Previews & Production CI/CD',
    detail:
      'We build the full-stack platform in rapid weekly milestones—combining senior systems architecture with AI-accelerated implementation and automated testing.',
  },
  {
    n: '04.',
    title: 'Deploy & Evolve',
    deliverable: 'Full IP Handover, Team Onboarding & Evolution',
    detail:
      'We deploy to your production environment, train your operators, hand over 100% of the repository, and evolve the system as your volume scales.',
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="grid-blueprint border-t border-border bg-surface/85 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end" data-animate>
          <div className="max-w-[46ch]">
            <p className="eyebrow mb-4">Our Engineering Approach</p>
            <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]">
              How we take you from spreadsheets to a custom OS
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            A structured four-stage blueprint that turns operational complexity
            into clean, maintainable software your team owns outright.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="group relative flex flex-col justify-between bg-surface p-7 md:p-8"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
                  <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                    {step.n}
                  </span>
                  <span className="font-mono text-[10.5px] text-dim">
                    Phase {i + 1}
                  </span>
                </div>
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  Key Deliverable
                </p>
                <p className="mt-1 font-mono text-[11.5px] font-medium text-blue-deep">
                  {step.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
