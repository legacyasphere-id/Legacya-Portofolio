import { useT } from '../i18n/context'

const TOOLS = ['Claude', 'Hermes', 'Gemini', 'Figma', 'Google Flow', 'Seedance']

export function AIWorkflowSection() {
  const { t } = useT()

  return (
    <section
      id="ai-workflow"
      className="border-t border-border bg-bg/95 px-5 py-12 backdrop-blur-sm md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-3">{t.aiWorkflow.eyebrow}</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.08] [text-wrap:balance]">
              {t.aiWorkflow.heading}
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            {t.aiWorkflow.subline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {t.aiWorkflow.steps.map((step, i) => (
            <div
              key={step.n}
              className="flex flex-col bg-surface p-4 sm:p-6"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div className="mb-2.5 flex items-center justify-between border-b border-border pb-2">
                <span className="font-mono text-[12.5px] font-semibold text-blue-deep tabular-nums">
                  {step.n}
                </span>
                <span className="font-mono text-[10px] text-dim">
                  {t.aiWorkflow.stepLabel} {i + 1}
                </span>
              </div>
              <h3 className="text-[1.05rem] sm:text-[1.15rem] font-semibold tracking-[-0.02em] text-text">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-snug text-muted">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-4 font-mono text-[11.5px] text-dim"
          data-animate
          data-delay="200"
        >
          {TOOLS.join(' · ')}
        </p>
      </div>
    </section>
  )
}
