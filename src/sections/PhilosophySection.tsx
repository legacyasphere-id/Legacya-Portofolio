export function PhilosophySection() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[900px]">
        <p className="eyebrow mb-8" data-animate>
          Philosophy
        </p>

        <h2
          className="display text-[clamp(2.4rem,5.6vw,4.2rem)] leading-[1.06]"
          data-animate
          data-delay="100"
        >
          Systems over <span className="text-blue-accent">software</span>.
        </h2>

        <div className="mt-10 max-w-[60ch] space-y-6 text-[clamp(1.15rem,1.8vw,1.5rem)] font-light leading-[1.5] text-muted">
          <p data-animate data-delay="200">
            Most businesses don&rsquo;t need more tools. They need better
            systems.
          </p>
          <p data-animate data-delay="300">
            Technology should simplify operations, remove friction, and create
            leverage, not add another login to an already crowded screen.
          </p>
          <p data-animate data-delay="400">
            Our work focuses on building{' '}
            <span className="font-normal text-text">
              operational foundations that scale alongside business growth
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
