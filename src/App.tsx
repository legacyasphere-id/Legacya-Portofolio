import { useEffect } from 'react'
import { SiteNav } from './components/SiteNav'
import { SectionGuide } from './components/SectionGuide'
import { HeroSection } from './sections/HeroSection'
import { SolutionsSection } from './sections/SolutionsSection'
import { WorkSection } from './sections/WorkSection'
import { ProofSection } from './sections/ProofSection'
import { ProcessSection } from './sections/ProcessSection'
import { TechStackSection } from './sections/TechStackSection'
import { PhilosophySection } from './sections/PhilosophySection'
import { FounderSection } from './sections/FounderSection'
import { PricingSection } from './sections/PricingSection'
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
    <div id="top" className="min-h-screen">
      <SiteNav />
      <SectionGuide />
      <main>
        <HeroSection />
        <SolutionsSection />
        <WorkSection />
        <ProofSection />
        <ProcessSection />
        <TechStackSection />
        <PhilosophySection />
        <FounderSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
