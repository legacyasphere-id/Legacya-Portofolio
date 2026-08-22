import { asset } from '../utils/asset'

/**
 * Proof. A dark metrics band carries the headline numbers, followed by the
 * Anthropic credentials and a trusted-by line. Testimonials are
 * testimonial-ready: drop real, attributed quotes into `TESTIMONIALS` and they
 * render below the band, we don't publish fabricated quotes.
 */
interface Testimonial {
  quote: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = []

const METRICS = [
  { value: '4', label: 'Systems Built' },
  { value: '2026', label: 'Founded' },
  { value: '3+', label: 'Industries Served' },
]

// Real Anthropic certificates — thumbnail preview links to the full PDF.
const CERTS = [
  {
    title: 'Claude 101',
    thumb: asset('assets/certificates/claude-101.webp'),
    pdf: asset('assets/certificates/claude-101-anthropic.pdf'),
  },
  {
    title: 'Claude Code 101',
    thumb: asset('assets/certificates/claude-code-101.webp'),
    pdf: asset('assets/certificates/claude-code-101-anthropic.pdf'),
  },
  {
    title: 'Introduction to Claude Cowork',
    thumb: asset('assets/certificates/claude-cowork.webp'),
    pdf: asset('assets/certificates/claude-cowork-anthropic.pdf'),
  },
  {
    title: 'AI Fluency: Framework & Foundations',
    thumb: asset('assets/certificates/ai-fluency-framework.webp'),
    pdf: asset('assets/certificates/ai-fluency-framework-anthropic.pdf'),
  },
]

export function ProofSection() {
  return (
    <section id="proof" className="border-t border-border bg-surface/50 px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 max-w-[46ch]" data-animate>
          <p className="eyebrow mb-4">Proof</p>
          <h2 className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]">
            Running in production, not just in pitch decks.
          </h2>
        </div>

        {/* Dark metrics band, the one dark moment on the page. */}
        <div
          className="overflow-hidden rounded-2xl bg-[#17181B] px-6 py-14 md:px-10 md:py-16"
          data-animate
        >
          <div className="mx-auto flex max-w-[900px] flex-col items-center justify-around gap-10 sm:flex-row sm:gap-6">
            {METRICS.map((m, i) => (
              <div key={m.label} className="flex items-center gap-10 sm:contents">
                <div className="flex flex-col items-center gap-2">
                  <span className="display font-extrabold leading-none text-blue-accent text-[clamp(3.4rem,8vw,5.5rem)]">
                    {m.value}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9CA3AF]">
                    {m.label}
                  </span>
                </div>
                {i < METRICS.length - 1 && (
                  <span className="hidden h-16 w-px bg-white/10 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Anthropic credentials — a differentiator few studio sites show. */}
        <div className="mt-14">
          <p
            className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
            data-animate
          >
            Anthropic-certified
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTS.map((c, i) => (
              <a
                key={c.title}
                href={c.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover group flex flex-col overflow-hidden"
                data-animate
                data-delay={String((i + 1) * 100)}
              >
                <img
                  src={c.thumb}
                  alt={`${c.title} certificate of completion from Anthropic`}
                  className="aspect-[4/3] w-full border-b border-border object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[14px] font-semibold tracking-tight text-text">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[12.5px] text-muted">
                    Anthropic · Certificate of Completion
                  </p>
                  <span className="link-sweep mt-4 text-[13px]">
                    View certificate
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {TESTIMONIALS.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
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
                  <span className="font-semibold text-text">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
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
