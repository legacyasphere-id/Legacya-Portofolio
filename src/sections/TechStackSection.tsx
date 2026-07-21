import { asset } from '../utils/asset'

interface Logo {
  name: string
  file: string
  shine?: boolean
}

// Layer 1, the technology stack we build on.
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

// Layer 2, the AI models in the workflow. Claude is highlighted.
const AI: Logo[] = [
  { name: 'GPT', file: 'gpt' },
  { name: 'Gemini', file: 'gemini' },
  { name: 'Claude', file: 'claude', shine: true },
]

function Badge({ item }: { item: Logo }) {
  return (
    <div className={`tech-badge ${item.shine ? 'tech-badge--shine' : ''}`}>
      <img
        src={asset(`logos/${item.file}.svg`)}
        alt={item.name}
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
        {/* Duplicate set for a seamless loop */}
        {items.map((item, i) => (
          <Badge key={`b-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}

export function TechStackSection() {
  // Repeat the small AI set so the row fills the width before duplicating.
  const aiRow = [...AI, ...AI, ...AI, ...AI]

  return (
    <section
      id="tech-stack"
      className="border-y border-border bg-bg px-5 py-24 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[42%_58%] lg:gap-16">
        {/* Left, copy */}
        <div>
          <p
            className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-deep"
            data-animate
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-deep" />
            Our Tech Stack
          </p>
          <h2
            className="display text-[clamp(2.1rem,4vw,3.3rem)] leading-[1.08]"
            data-animate
            data-delay="100"
          >
            Key Technologies &amp; Platforms
          </h2>
          <p
            className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted"
            data-animate
            data-delay="200"
          >
            We build on leading platforms and models, chosen for reliability,
            speed, and long-term maintainability, with AI as a co-engineer at
            every stage.
          </p>
          <a href="#work" className="btn-primary mt-8 inline-flex" data-animate data-delay="300">
            Explore Tech Stack
          </a>
        </div>

        {/* Right, two horizontal marquee layers */}
        <div className="min-w-0 space-y-8" data-animate data-delay="200">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
              Stack
            </p>
            <Marquee items={STACK} />
          </div>

          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim">
              AI Models
            </p>
            <Marquee items={aiRow} reverse />
          </div>
        </div>
      </div>
    </section>
  )
}
