import { asset } from '../utils/asset'

interface Logo {
  name: string
  file: string
  shine?: boolean
}

const STACK: Logo[] = [
  { name: 'React', file: 'react' },
  { name: 'TypeScript', file: 'typescript' },
  { name: 'JavaScript', file: 'javascript' },
  { name: 'Vue.js', file: 'vue' },
  { name: 'Node.js', file: 'node' },
  { name: 'Laravel', file: 'laravel' },
  { name: 'PostgreSQL', file: 'postgresql' },
  { name: 'Supabase', file: 'supabase' },
  { name: 'Tailwind CSS', file: 'tailwind' },
  { name: 'Vite', file: 'vite' },
  { name: 'Docker', file: 'docker' },
  { name: 'n8n', file: 'n8n' },
  { name: 'Vercel', file: 'vercel' },
  { name: 'GitHub', file: 'github' },
]

const AI: Logo[] = [
  { name: 'GPT', file: 'gpt' },
  { name: 'Gemini', file: 'gemini' },
  { name: 'Claude', file: 'claude', shine: true },
]

function Badge({ item }: { item: Logo }) {
  return (
    <div className={`tech-badge ${item.shine ? 'tech-badge--shine' : ''}`} title={item.name}>
      <img
        src={asset(`logos/${item.file}.svg`)}
        alt={item.name}
        referrerPolicy="no-referrer"
        className="relative h-7 w-7 object-contain"
        loading="lazy"
      />
    </div>
  )
}

function Marquee({ items, reverse }: { items: Logo[]; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className={`marquee__track ${reverse ? 'marquee__track--reverse' : ''}`}>
        {items.map((item, i) => (
          <Badge key={`a-${i}`} item={item} />
        ))}
        {items.map((item, i) => (
          <Badge key={`b-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export function TechStackSection() {
  const aiRow = [...AI, ...AI, ...AI, ...AI]

  return (
    <section
      id="tech-stack"
      className="border-y border-border bg-bg px-5 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[42%_58%] lg:gap-16">
        <div>
          <p className="eyebrow mb-4" data-animate>
            Execution Infrastructure
          </p>
          <h2
            className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08] [text-wrap:balance]"
            data-animate
            data-delay="100"
          >
            Production stack &amp; AI models
          </h2>
          <p
            className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-muted"
            data-animate
            data-delay="200"
          >
            We build on battle-tested relational databases, type-safe web
            frameworks, and frontier LLMs—chosen for long-term maintainability,
            security, and speed of execution.
          </p>
          <a
            href="#work"
            className="btn-secondary mt-8 inline-flex whitespace-nowrap"
            data-animate
            data-delay="300"
          >
            See Stack in Production
          </a>
        </div>

        <div className="min-w-0 space-y-8" data-animate data-delay="200">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
              Core Engineering &amp; Cloud Platforms
            </p>
            <Marquee items={STACK} />
          </div>

          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
              AI Co-Engineering &amp; Reasoning Models
            </p>
            <Marquee items={aiRow} reverse />
          </div>
        </div>
      </div>
    </section>
  )
}
