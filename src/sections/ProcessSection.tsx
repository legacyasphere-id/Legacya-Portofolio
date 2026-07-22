const STEPS = [
  {
    n: '01',
    title: 'Discover',
    detail:
      'Understand business operations and identify bottlenecks. We map how work actually flows before proposing anything.',
  },
  {
    n: '02',
    title: 'Architect',
    detail:
      'Design systems, workflows, and operational structure. Data models and boundaries are defined before a line of code.',
  },
  {
    n: '03',
    title: 'Build',
    detail:
      'Develop scalable platforms and infrastructure, built to be reliable, secure, and ready for production from day one.',
  },
  {
    n: '04',
    title: 'Evolve',
    detail:
      'Continuously improve systems as the business grows. Operational foundations should scale alongside the company.',
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="grid-blueprint border-t border-border px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-14 max-w-[44ch]" data-animate>
          <p className="eyebrow mb-4">Our Approach</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            How we build
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white">
            A structured framework that turns operational complexity into
            systems your business can rely on.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="group relative flex flex-col bg-surface p-7 md:p-8"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[13px] font-medium text-blue-deep">
                  {step.n}
                </span>
                <span className="h-2 w-2 rounded-full border border-blue-deep bg-blue/30" />
              </div>
              <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
