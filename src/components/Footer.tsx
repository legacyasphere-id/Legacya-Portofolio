import { identity } from '../core/identity'

export function Footer() {
  const linkClass =
    'block py-1 text-[14px] text-[#C9BBA4] transition-colors duration-300 hover:text-accent-light'

  return (
    <footer className="band-navy px-5 pb-7 pt-20 md:px-[6vw]">
      <div className="mb-20 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
        <div>
          <p className="eyebrow mb-3.5">Navigate</p>
          <a href="#top" className={linkClass}>Home</a>
          <a href="#work" className={linkClass}>Work</a>
          <a href="#services" className={linkClass}>Services</a>
          <a href="#contact" className={linkClass}>Contact</a>
        </div>
        <div>
          <p className="eyebrow mb-3.5">Social</p>
          <a href="https://www.instagram.com/legacya.id" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Instagram
          </a>
          <a href={identity.social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={identity.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
        </div>
        <div>
          <p className="eyebrow mb-3.5">Studio</p>
          <p className="text-[14px] leading-relaxed text-[#C9BBA4]">
            Founded by {identity.name}
            <br />
            {identity.location} — working worldwide.
            <br />
            <a
              href={`mailto:${identity.social.email}`}
              className="transition-colors duration-300 hover:text-accent-light"
            >
              {identity.social.email}
            </a>
          </p>
        </div>
      </div>

      <p className="wordmark" aria-hidden="true">
        Legacya Sphere
      </p>

      <p className="mt-9 border-t border-white/10 pt-6 text-center text-[12px] text-[#C9BBA4]">
        © {new Date().getFullYear()} Legacya Sphere. Built with intent.
      </p>
    </footer>
  )
}
