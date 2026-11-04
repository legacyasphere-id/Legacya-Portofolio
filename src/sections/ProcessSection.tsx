import { useT } from '../i18n/context'

export function ProcessSection() {
  const { t } = useT()

  return (
    <section
      id="process"
      className="grid-blueprint border-t border-border bg-surface/85 px-5 py-10 backdrop-blur-sm md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-2.5">{t.process.eyebrow}</p>
            <h2 className="display text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] [text-wrap:balance]">
              {t.process.heading}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-5">
          {t.process.steps.map((step, i) => (
            <div
              key={step.n}
              className="group relative flex flex-col justify-between bg-surface p-4 sm:p-6"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono text-[12.5px] font-semibold text-blue-deep tabular-nums">
                    {step.n}
                  </span>
                  <span className="font-mono text-[10px] text-dim">
                    {step.deliverable}
                  </span>
                </div>
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-text">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
