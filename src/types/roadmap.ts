export interface Roadmap {
  lastUpdated: string
  current: RoadmapItem[]
  inProgress: RoadmapItem[]
  planned: RoadmapItem[]
}

export interface RoadmapItem {
  id: string
  title: string
  detail: string
  category: 'learning' | 'building' | 'exploring' | 'reading' | 'experiment'
  progress?: number
}
