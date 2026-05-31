import type { Project } from '../types/project'
import { CaseStudy } from './CaseStudy'

interface ProjectsProps {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="space-y-6">
      {featured && <CaseStudy project={featured} variant="featured" />}
      <div className="grid lg:grid-cols-3 gap-5">
        {rest.map((p) => (
          <CaseStudy key={p.id} project={p} variant="grid" />
        ))}
      </div>
    </div>
  )
}
