import { HeroSection } from './sections/HeroSection'
import { OSSection } from './sections/OSSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { FlowSection } from './sections/FlowSection'
import { RoadmapSection } from './sections/RoadmapSection'
import { ContactSection } from './sections/ContactSection'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <HeroSection />
      <OSSection />
      <ProjectsSection />
      <FlowSection />
      <RoadmapSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
