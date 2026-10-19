const STEPS = [
  {
    n: '01.',
    title: 'Discover',
    deliverable: 'Shared Understanding & Project Brief',
    detail:
      'We start by listening and understanding your business, your audience, the challenge you are solving, and what a successful outcome looks like for your team.',
  },
  {
    n: '02.',
    title: 'Define',
    deliverable: 'Clear Direction, Scope & Timeline',
    detail:
      'We establish the visual direction, functional structure, deliverables, and realistic project milestones so everyone is aligned before production begins.',
  },
  {
    n: '03.',
    title: 'Create',
    deliverable: 'Working Previews & Campaign Drafts',
    detail:
      'We design and build your website, business system, campaign visuals, or promotional video, sharing structured progress updates at agreed checkpoints.',
  },
  {
    n: '04.',
    title: 'Refine',
    deliverable: 'Focused Review & Adjustments',
    detail:
      'We review the work together against your business objectives, refining visual details, copy clarity, and user flows until everything feels cohesive.',
  },
  {
    n: '05.',
    title: 'Deliver',
    deliverable: 'Final Launch & Complete Asset Handover',
    detail:
      'We launch the finished digital experience or hand over your ready-to-use campaign and video assets, complete with clear guidance for your team.',
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="grid-blueprint border-t border-border bg-surface/85 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">How We Work</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              A straightforward five-step collaboration from first conversation to delivery
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            Whether you are commissioning a new business website, an internal
            operational tool, or a campaign asset suite, our process keeps things
            clear, organized, and predictable.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="group relative flex flex-col justify-between bg-surface p-6 md:p-7"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                  <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                    {step.n}
                  </span>
                  <span className="font-mono text-[10.5px] text-dim">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-text">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  Outcome
                </p>
                <p className="mt-1 font-mono text-[11px] font-medium text-blue-deep">
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
