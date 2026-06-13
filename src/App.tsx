import { useEffect } from 'react'
import { SiteNav } from './components/SiteNav'
import { HeroSection } from './sections/HeroSection'
import { TrustSection } from './sections/TrustSection'
import { SystemsSection } from './sections/SystemsSection'
import { WorkSection } from './sections/WorkSection'
import { ProcessSection } from './sections/ProcessSection'
import { PhilosophySection } from './sections/PhilosophySection'
import { OSStatusSection } from './sections/OSStatusSection'
import { CTASection } from './sections/CTASection'
import { Footer } from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  useEffect(() => {
    // Signal the fallback timeout in index.html that React mounted
    ;(window as unknown as { __spl: boolean }).__spl = true
    const splash = document.getElementById('ls-splash')
    if (!splash) return
    splash.classList.add('hidden')
    const t = setTimeout(() => splash.remove(), 520)
    return () => clearTimeout(t)
  }, [])

  useScrollReveal()

  return (
    <div id="top" className="min-h-screen bg-bg">
      <SiteNav />
      <main>
        <HeroSection />
        <TrustSection />
        <SystemsSection />
        <WorkSection />
        <ProcessSection />
        <PhilosophySection />
        <OSStatusSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
