export interface Project {
  id: string
  name: string
  tagline: string
  type: string
  status: 'live' | 'in-progress' | 'archived'
  featured: boolean
  caseStudy: CaseStudy
  architecture: ProjectArchitecture
  stack: string[]
  links: ProjectLinks
  screenshots: Screenshot[]
}

export interface CaseStudy {
  problem: string
  thinkingProcess: string
  aiRole: string
  architecture: string
  technicalExecution: string
  outcome: string
}

export interface ProjectArchitecture {
  frontend?: string
  backend?: string
  database?: string
  deploy?: string
  realtime?: string
  auth?: string
}

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface Screenshot {
  src: string
  alt: string
}
