import { profile } from '../data/profile'
import { siteConfig } from '../core/config'
import { identity } from '../core/identity'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="mb-10">
          <div
            className="leading-none select-none"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(3rem,16vw,9rem)',
              fontStyle: 'italic',
              color: '#1C1A17',
              letterSpacing: '-0.02em',
            }}
          >
            Legacya Sphere<span style={{ color: '#B8956A' }}>.</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={profile.logo} alt="" className="w-7 h-7 object-contain opacity-80" />
              <span className="font-mono text-[13px] font-medium text-text">Legacya Sphere</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">{identity.description}</p>
            <p className="mt-2 text-[12px] text-dim italic">Developer operasional software berbasis AI.</p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-dim mb-4">Navigation</h4>
            <ul className="space-y-2 text-[13px]">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-muted hover:text-cyan transition-colors">{item.label}</a>
                </li>
              ))}
              <li><a href="#contact" className="text-muted hover:text-cyan transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-dim mb-4">Services</h4>
            <ul className="space-y-2 text-[13px]">
              <li><a href="#contact" className="text-muted hover:text-cyan transition-colors">Operational Software Systems</a></li>
              <li><a href="#contact" className="text-muted hover:text-cyan transition-colors">Frontend UI Development</a></li>
              <li><a href="#contact" className="text-muted hover:text-cyan transition-colors">AI Automation Workflows</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-dim mb-4">Connect</h4>
            <ul className="space-y-2 text-[13px]">
              <li><a href={`mailto:${siteConfig.social.email}`} className="text-muted hover:text-cyan transition-colors">{siteConfig.social.email}</a></li>
              <li><a href={siteConfig.social.github} target="_blank" rel="noopener" className="text-muted hover:text-cyan transition-colors">GitHub</a></li>
              <li><a href={siteConfig.social.linkedin} target="_blank" rel="noopener" className="text-muted hover:text-cyan transition-colors">LinkedIn</a></li>
              <li><a href={siteConfig.social.fiverr} target="_blank" rel="noopener" className="text-muted hover:text-cyan transition-colors">Fiverr</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-dim">© 2026 Legacya Sphere · {profile.name} · Bekasi, Indonesia</p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-dim">
            <span className="status-dot-green" />
            Available for selective engagements
          </div>
        </div>
      </div>
    </footer>
  )
}
