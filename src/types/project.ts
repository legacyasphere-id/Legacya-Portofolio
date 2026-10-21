export interface Project {
  id: string
  name: string
  tagline: string
  category: 'Digital Experiences & Business Systems'
  type: string
  industry: string
  workClassification: string
  status: 'live' | 'in-progress' | 'concept'
  featured: boolean
  caseStudy: CaseStudy
  deliverables: string[]
  /** One mono line under "What was delivered", e.g. timeline and stack. Hidden when empty. */
  buildNotes?: string
  links: ProjectLinks
  screenshots: Screenshot[]
}

export interface CaseStudy {
  challenge: string
  solution: string
  intendedValue: string
  highlights: string
}

export interface ProjectLinks {
  live?: string
}

export interface Screenshot {
  src: string
  alt: string
}

export type CreativeServiceCategory =
  | 'Advertising & Campaign Assets'
  | 'Cinematic Video & Visual Production'

export interface CreativeWorkItem {
  id: string
  title: string
  brandOrConcept: string
  category: CreativeServiceCategory
  format: string
  classification:
    | 'Studio Campaign Showcase'
    | 'Studio Video Showcase'
    | 'Conceptual Campaign Study'
    | 'Studio Visual Direction'
    | 'Verified Brand Work'
  /** 'concept' = self-initiated study, not commissioned by the brand shown. */
  engagement: 'commissioned' | 'concept'
  availabilityStatus: 'Available Now' | 'Custom Production · In Development'
  objective: string
  creativeDirection: string
  deliverables: string[]
  intendedValue: string
  palette: {
    primary: string
    secondary: string
    accent: string
    label: string
  }
  aspectRatio: '16:9' | '4:3' | '9:16'
  mediaType: 'image-board' | 'video-storyboard' | 'uploaded-media'
  previewImage?: string
  videoUrl?: string
  storyboardFrames: {
    step: string
    title: string
    caption: string
  }[]
}
