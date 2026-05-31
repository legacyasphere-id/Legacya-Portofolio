import type { Profile } from '../types/profile'

interface HeroProps {
  profile: Profile
}

const systemMetrics = [
  { value: '4', label: 'Systems Shipped' },
  { value: '2', label: 'Active Builds' },
  { value: '9+', label: 'Production Screens' },
  { value: 'AI', label: 'Co-Engineer' },
]

export function Hero({ profile }: HeroProps) {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-5 sm:px-8 max-w-7xl mx-auto">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)',
        }}
      />

      {/* Top meta row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-16">
        <div className="flex items-center gap-3">
          <img src={profile.logo} alt="" className="w-7 h-7 object-contain opacity-80" />
          <div>
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted">Legacya Sphere</div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-dim mt-0.5">
              {profile.location} · {profile.timezone}
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 text-[11px] font-mono text-muted self-start">
          <span className="status-dot-green animate-pulse" />
          {profile.availability}
        </div>
      </div>

      {/* Identity badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {profile.identities.map((id) => (
          <span key={id} className="chip-cyan text-[11px]">
            {id}
          </span>
        ))}
      </div>

      {/* Main headline */}
      <h1 className="text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] font-semibold tracking-tight text-text max-w-4xl">
        <span className="text-gradient-cyan">AI-Native</span>
        <br />
        Founder OS
      </h1>

      <p className="mt-6 text-[clamp(1rem,2vw,1.15rem)] text-muted leading-relaxed max-w-2xl">
        {profile.coreMessage}
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#founder-os" className="btn-primary">
          Explore Founder OS
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href="#projects" className="btn-ghost">
          View Build Output
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <a href={profile.github} target="_blank" rel="noopener" className="btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
      </div>

      {/* System metrics bar — replaces CV-like marquee */}
      <div className="mt-16 border-t border-b border-border py-4">
        <div className="flex flex-wrap items-center gap-0 divide-x divide-border">
          {systemMetrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2 px-6 first:pl-0 last:pr-0">
              <span className="font-mono text-[22px] font-semibold text-cyan leading-none">{m.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-dim">{m.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-6 ml-auto">
            <span className="status-dot-green animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-green">System Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
