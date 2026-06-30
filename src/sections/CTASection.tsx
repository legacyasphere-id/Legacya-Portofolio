import { identity } from '../core/identity'

export function CTASection() {
  return (
    <section
      id="contact"
      className="band-navy border-y border-navy-deep px-5 py-36 text-center md:px-[6vw]"
    >
      <h2 className="mx-auto max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)] text-bg" data-animate>
        Let&rsquo;s build something{' '}
        <em className="font-soft-italic text-accent-light">that lasts.</em>
      </h2>
      <p className="mx-auto mb-10 mt-6 max-w-[44ch] text-[#C9BBA4]" data-animate data-delay="100">
        Tell us what&rsquo;s slowing your brand down. We&rsquo;ll design the
        system that fixes it.
      </p>
      <a
        className="btn btn-big bg-bg text-navy-deep hover:-translate-y-0.5 hover:bg-accent hover:text-ink"
        href={`mailto:${identity.social.email}`}
        data-animate
        data-delay="200"
      >
        Talk to us
      </a>
    </section>
  )
}
