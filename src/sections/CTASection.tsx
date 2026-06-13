import { identity } from '../core/identity'

export function CTASection() {
  return (
    <section
      id="contact"
      className="grad-cta border-y border-border px-5 py-32 text-center md:px-10 md:py-44"
    >
      <div className="mx-auto max-w-[760px]">
        <h2
          className="display mx-auto max-w-[20ch] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.05]"
          data-animate
        >
          Let&rsquo;s build the system behind your{' '}
          <em className="italic text-blue-accent">growth</em>.
        </h2>

        <p
          className="mx-auto mb-11 mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted"
          data-animate
          data-delay="100"
        >
          Whether you&rsquo;re replacing spreadsheets, improving operations, or
          building a centralized platform, we can help create the infrastructure
          your business needs to scale.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-3.5"
          data-animate
          data-delay="200"
        >
          <a
            className="btn-primary btn-lg"
            href={`mailto:${identity.social.email}`}
          >
            Start a Project
          </a>
          <a className="btn-secondary btn-lg" href="#work">
            See case studies
          </a>
        </div>
      </div>
    </section>
  )
}
