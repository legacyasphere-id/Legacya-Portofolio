/**
 * Trust / proof strip. We don't publish fabricated testimonials — the cards
 * below are factual outcomes from systems running in production today, drawn
 * straight from the OS status board. When real, attributed client quotes are
 * available, drop them into `TESTIMONIALS` and they render in place of the
 * outcome statements.
 */
interface Testimonial {
  quote: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = []

const OUTCOMES = [
  {
    context: 'Warehouse operations',
    outcome:
      'Multi-role inventory live in production — manual spreadsheet workflows retired for real-time, accurate stock.',
  },
  {
    context: 'Restaurant operations',
    outcome:
      'Cashier, kitchen display, and revenue analytics unified on one real-time platform.',
  },
  {
    context: 'Back-office',
    outcome:
      'Automation pipelines removing repetitive admin and connecting fragmented business tools.',
  },
]

export function ProofSection() {
  return (
    <section className="border-t border-border bg-surface/50 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[46ch]" data-animate>
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            Running in production, not just in pitch decks.
          </h2>
        </div>

        {TESTIMONIALS.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name}
                className="card flex flex-col p-7"
                data-animate
                data-delay={String(Math.min((i + 1) * 100, 500))}
              >
                <blockquote className="text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-text">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[13px] text-muted">
                  <span className="font-semibold text-text">{t.name}</span> ·{' '}
                  {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <div
                key={o.context}
                className="card flex flex-col p-6"
                data-animate
                data-delay={String(Math.min((i + 1) * 100, 500))}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-blue-deep">
                  {o.context}
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                  {o.outcome}
                </p>
              </div>
            ))}
          </div>
        )}

        <p
          className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
          data-animate
          data-delay="200"
        >
          Trusted in real operations across warehouse, retail &amp; F&amp;B
        </p>
      </div>
    </section>
  )
}
