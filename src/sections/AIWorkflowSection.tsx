const STEPS = [
  {
    n: '01.',
    title: 'Brief → structured spec',
    detail:
      'Your goals become a written spec that AI and I both work from, so nothing is guessed.',
  },
  {
    n: '02.',
    title: 'AI drafts, I direct',
    detail:
      'Claude and Gemini generate code, copy and visual drafts. I make the decisions and fix what is wrong.',
  },
  {
    n: '03.',
    title: 'Human review gates',
    detail:
      'Nothing ships without my review. Facts, brand rules and quality are checked before you see it.',
  },
  {
    n: '04.',
    title: 'You own everything',
    detail:
      'Code, files and accounts are yours at handover, with documentation.',
  },
]

// TODO(yoga): confirm tool list.
const TOOLS = ['Claude Code', 'Gemini', 'Google Flow', 'Figma', 'Supabase', 'Vercel', 'n8n']

export function AIWorkflowSection() {
  return (
    <section
      id="ai-workflow"
      className="border-t border-border bg-bg/95 px-5 py-24 backdrop-blur-sm md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          data-animate
        >
          <div className="max-w-[640px]">
            <p className="eyebrow mb-4">AI Workflow</p>
            <h2 className="display text-[clamp(1.95rem,3.4vw,2.85rem)] leading-[1.1] [text-wrap:balance]">
              How I work with AI
            </h2>
          </div>
          <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            AI does the drafting. I own the decisions, the review and the result.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="flex flex-col bg-surface p-6 md:p-7"
              data-animate
              data-delay={String((i + 1) * 100)}
            >
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-[13px] font-semibold text-blue-deep tabular-nums">
                  {step.n}
                </span>
                <span className="font-mono text-[10.5px] text-dim">Step {i + 1}</span>
              </div>
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-text">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-6 font-mono text-[11.5px] text-dim"
          data-animate
          data-delay="200"
        >
          {TOOLS.join(' · ')}
        </p>
      </div>
    </section>
  )
}
