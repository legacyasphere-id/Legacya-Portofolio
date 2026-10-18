export function PhilosophySection() {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div
          className="rounded-3xl border border-border bg-surface/90 p-8 shadow-sm backdrop-blur-md sm:p-12 md:p-16"
          data-animate
        >
          <p className="eyebrow mb-6">Studio Philosophy</p>

          <h2 className="display max-w-[22ch] text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] [text-wrap:balance]">
            Systems over <span className="text-blue-deep">software</span>.
          </h2>

          <div className="mt-8 grid gap-8 border-t border-border pt-8 lg:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] font-semibold text-blue-deep tabular-nums">
                01. The Core Premise
              </p>
              <p className="mt-2.5 text-[16px] font-medium leading-relaxed text-text">
                Most businesses don&rsquo;t need more tools. They need better
                systems.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] font-semibold text-blue-deep tabular-nums">
                02. Operational Leverage
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Technology should simplify operations, remove manual friction,
                and create compounding leverage—not add another subscription
                login to an already crowded screen.
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] font-semibold text-blue-deep tabular-nums">
                03. Built for Legacy
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Our work focuses on architecting{' '}
                <span className="font-medium text-text">
                  operational foundations that scale alongside business growth
                </span>{' '}
                and outlast the individuals who set them up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
