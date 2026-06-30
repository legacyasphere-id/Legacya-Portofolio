import { identity } from '../core/identity'

const STATS = [
  { value: '6', label: 'Systems shipped' },
  { value: '4', label: 'Live on Vercel' },
  { value: 'AI-native', label: 'Build workflow' },
  { value: 'React · Supabase', label: 'Core stack' },
]

export function StudioSection() {
  return (
    <section id="studio" className="px-5 py-24 md:px-[6vw]">
      <p className="max-w-[52ch] text-[clamp(1.1rem,1.8vw,1.4rem)] leading-relaxed text-text" data-animate>
        An independent studio founded by{' '}
        <span className="font-soft-italic text-accent">{identity.name}</span> —{' '}
        {identity.location.split(',')[0]}, Indonesia. Every system is built
        AI-native, with Claude as co-engineer from architecture to deployment.
      </p>

      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1.5"
            data-animate
            data-delay={String((i + 1) * 100)}
          >
            <strong className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-text">
              {stat.value}
            </strong>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
