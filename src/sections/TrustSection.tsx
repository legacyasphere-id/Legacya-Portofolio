const TECH = [
  'React',
  'TypeScript',
  'Vue.js',
  'Laravel',
  'Supabase',
  'PostgreSQL',
  'Gemini',
  'n8n',
]

export function TrustSection() {
  return (
    <section className="border-y border-border bg-surface/50 px-5 py-10 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        <p
          className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
          data-animate
        >
          Built on a modern, reliable technology foundation
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14"
          data-animate
          data-delay="100"
        >
          {TECH.map((name) => (
            <span
              key={name}
              className="text-[15px] font-medium tracking-tight text-muted/70 transition-colors duration-300 hover:text-text"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
