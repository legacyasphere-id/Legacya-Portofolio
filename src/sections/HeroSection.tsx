import { profile } from '../data/profile'
import { siteConfig } from '../core/config'
import { Hero } from '../components/Hero'

export function HeroSection() {
  return (
    <section id="hero">
      {/* Sticky nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: 'rgba(247,244,237,0.92)', backdropFilter: 'blur(12px)' }}>
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Legacya Sphere — home">
            <img src={profile.logo} alt="" className="w-5 h-5 object-contain opacity-80" />
            <span className="font-mono text-[13px] font-medium text-muted group-hover:text-cyan transition-colors">Legacya Sphere</span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-[12px] text-dim">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-cyan transition-colors">{item.label}</a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noopener" className="btn-ghost text-[12px] px-3 py-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a href="#contact" className="btn-primary text-[12px] px-4 py-1.5">
              Let's Build
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <a href="#contact" className="md:hidden btn-primary text-[12px] px-3 py-1.5">Contact</a>
        </nav>
      </header>

      <Hero profile={profile} />
    </section>
  )
}
