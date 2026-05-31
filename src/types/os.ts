export interface FounderOSConfig {
  name: string
  version: string
  tagline: string
  principles: Principle[]
  workflow: WorkflowStep[]
  snapshot: OSSnapshot
}

export interface Principle {
  id: string
  title: string
  description: string
  icon: string
}

export interface WorkflowStep {
  step: number
  title: string
  description: string
  aiRole: string
  tools: string[]
}

export interface OSSnapshot {
  currentFocus: StatusItem[]
  activeLearning: StatusItem[]
  tools: ToolItem[]
  projectActivity: ActivityItem[]
}

export interface StatusItem {
  label: string
  detail: string
  status: 'active' | 'paused' | 'done'
}

export interface ToolItem {
  name: string
  role: string
  tier: 'primary' | 'secondary' | 'utility'
}

export interface ActivityItem {
  project: string
  phase: string
  status: 'building' | 'deployed' | 'iterating' | 'planning'
}
