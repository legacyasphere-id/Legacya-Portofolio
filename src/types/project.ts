export interface Project {
  id: string
  name: string
  tagline: string
  type: string
  industry?: string
  status: 'live' | 'in-progress' | 'archived'
  featured: boolean
  caseStudy: CaseStudy
  techStack: ProjectTechStack
  stack: string[]
  links: ProjectLinks
  screenshots: Screenshot[]
}

export interface CaseStudy {
  problem: string
  thinkingProcess: string
  aiRole: string
  architectureNote: string
  technicalExecution: string
  outcome: string
}

export interface ProjectTechStack {
  frontend?: string
  backend?: string
  database?: string
  deploy?: string
  realtime?: string
  auth?: string
  automation?: string
}

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface Screenshot {
  src: string
  alt: string
}
