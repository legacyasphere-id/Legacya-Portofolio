/**
 * Hero, the digital front door of an Operating Systems Studio.
 *
 * The attached artwork (body-level fixed background) IS the visual. Nothing
 * here competes with it: no gradients, rings, blobs, orbital graphics or
 * generated art. Typography is the strongest element: the headline wraps
 * naturally as one wide line of text, with the two CTAs stacked in a column
 * beside it on desktop (they drop below as a row on mobile).
 */
export function HeroSection() {
  return (
    <section id="hero" className="grad-hero relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pb-28 md:pt-36">
      {/* Soft, almost-invisible reading area behind the text, a gentle
          editorial backdrop that lifts text legibility off the brighter
          artwork. Not a panel, not a filter, fades out before mid-canvas. */}
      <div
        className="hero-veil pointer-events-none absolute inset-y-0 left-0 z-0 w-full lg:w-[70%]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] lg:pl-16 xl:pl-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Headline + supporting copy, wraps as normal paragraph text. */}
          <div className="max-w-[760px]">
            <h1
              className="display font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111111] text-[clamp(1.9rem,4.2vw,3.2rem)]"
              data-animate
              data-delay="100"
            >
              We&rsquo;re an <span className="text-blue-accent whitespace-nowrap">AI-Native</span> studio,
              solving every digital problem in your business.
            </h1>

            <p
              className="mt-8 max-w-[600px] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.7] text-white"
              data-animate
              data-delay="300"
            >
              We turn manual workflows into scalable digital infrastructure:
              platforms, dashboards, and automation that help companies operate
              with clarity.
            </p>
          </div>

          {/* CTAs: a row on mobile, a stacked column beside the headline on desktop. */}
          <div
            className="flex flex-row flex-wrap gap-4 lg:shrink-0 lg:flex-col lg:flex-nowrap"
            data-animate
            data-delay="500"
          >
            <a href="#contact" className="btn-primary btn-lg text-center">
              Discuss Your System
            </a>
            <a href="#work" className="btn-secondary btn-lg text-center">
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
