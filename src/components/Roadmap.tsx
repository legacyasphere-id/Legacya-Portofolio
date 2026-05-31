import type { Roadmap as RoadmapType, RoadmapItem } from '../types/roadmap'

interface RoadmapProps {
  roadmap: RoadmapType
}

const categoryColor: Record<RoadmapItem['category'], string> = {
  learning: 'chip-cyan',
  building: 'chip-green',
  exploring: 'chip-purple',
  reading: 'chip',
  experiment: 'chip-purple',
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <div className="card-base p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[13px] font-medium text-text leading-tight">{item.title}</div>
        <span className={`${categoryColor[item.category]} flex-shrink-0`}>{item.category}</span>
      </div>
      <p className="text-[12px] text-muted leading-relaxed">{item.detail}</p>
      {item.progress !== undefined && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-dim">Progress</span>
            <span className="font-mono text-[10px] text-cyan">{item.progress}%</span>
          </div>
          <div className="h-1 bg-raised rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-purple transition-all duration-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export function Roadmap({ roadmap }: RoadmapProps) {
  const sections = [
    { label: 'Current', dot: 'status-dot-green', color: 'text-green', items: roadmap.current },
    { label: 'In Progress', dot: 'status-dot-cyan', color: 'text-cyan', items: roadmap.inProgress },
    { label: 'Planned', dot: undefined, color: 'text-muted', items: roadmap.planned },
  ]

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.label}>
          <div className="flex items-center gap-2 mb-5">
            {section.dot && <span className={section.dot} />}
            <h3 className={`font-mono text-[11px] uppercase tracking-wider ${section.color}`}>{section.label}</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item) => (
              <RoadmapCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      <div className="card-base p-4 flex items-center justify-between">
        <span className="font-mono text-[11px] text-dim">Last updated · {roadmap.lastUpdated}</span>
        <a
          href="https://github.com/legacyasphere-id"
          target="_blank"
          rel="noopener"
          className="font-mono text-[11px] text-cyan hover:text-text transition-colors"
        >
          View active repos →
        </a>
      </div>
    </div>
  )
}
