import { identity } from '../core/identity'

export function Footer() {
  return (
    <footer className="px-5 pb-7 pt-20 md:px-[6vw]">
      <div className="mb-20 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-10">
        <div>
          <p className="eyebrow mb-3.5">Navigate</p>
          <a href="#top" className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent">Home</a>
          <a href="#work" className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent">Work</a>
          <a href="#services" className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent">Services</a>
          <a href="#contact" className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent">Contact</a>
        </div>
        <div>
          <p className="eyebrow mb-3.5">Social</p>
          <a
            href="https://www.instagram.com/legacya.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent"
          >
            Instagram
          </a>
          <a
            href={identity.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={identity.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-1 text-[14px] text-muted transition-colors duration-300 hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
        <div>
          <p className="eyebrow mb-3.5">Studio</p>
          <p className="text-[14px] leading-relaxed text-muted">
            Founded by {identity.name}
            <br />
            {identity.location} — working worldwide.
            <br />
            <a
              href={`mailto:${identity.social.email}`}
              className="transition-colors duration-300 hover:text-accent"
            >
              {identity.social.email}
            </a>
          </p>
        </div>
      </div>

      <p className="wordmark" aria-hidden="true">
        Legacya Sphere
      </p>

      <p className="mt-9 border-t border-border pt-6 text-center text-[12px] text-muted">
        © {new Date().getFullYear()} Legacya Sphere. Built with intent.
      </p>
    </footer>
  )
}
