import type { OSSnapshot } from '../types/os'

interface OSStatusProps {
  snapshot: OSSnapshot
}

const statusColors: Record<string, string> = {
  active: 'text-green border-green/20 bg-green/5',
  paused: 'text-purple border-purple/20 bg-purple/5',
  done: 'text-dim border-border bg-raised',
}

const activityColors: Record<string, string> = {
  building: 'text-cyan border-cyan/20 bg-cyan/5',
  deployed: 'text-green border-green/20 bg-green/5',
  iterating: 'text-purple border-purple/20 bg-purple/5',
  planning: 'text-muted border-border bg-raised',
}

export function OSStatus({ snapshot }: OSStatusProps) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Current Focus */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="status-dot-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">Current Focus</span>
        </div>
        <div className="space-y-3">
          {snapshot.currentFocus.map((item) => (
            <div key={item.label} className="border-t border-border pt-3 first:border-0 first:pt-0">
              <div className="text-[13px] font-medium text-text">{item.label}</div>
              <div className="text-[11px] text-muted mt-0.5">{item.detail}</div>
              <span className={`mt-2 inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded border ${statusColors[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Learning */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-purple">Active Learning</span>
        </div>
        <div className="space-y-3">
          {snapshot.activeLearning.map((item) => (
            <div key={item.label} className="border-t border-border pt-3 first:border-0 first:pt-0">
              <div className="text-[13px] font-medium text-text">{item.label}</div>
              <div className="text-[11px] text-muted mt-0.5">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Tools Active</span>
        </div>
        <div className="space-y-2.5">
          {snapshot.tools.map((tool) => (
            <div key={tool.name} className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-text">{tool.name}</div>
                <div className="text-[11px] text-dim">{tool.role}</div>
              </div>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${tool.tier === 'primary' ? 'chip-cyan' : tool.tier === 'secondary' ? 'chip-purple' : 'chip'}`}>
                {tool.tier}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project Activity */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Project Activity</span>
        </div>
        <div className="space-y-3">
          {snapshot.projectActivity.map((item) => (
            <div key={item.project} className="flex items-center justify-between border-t border-border pt-3 first:border-0 first:pt-0">
              <div>
                <div className="text-[13px] font-medium text-text">{item.project}</div>
                <div className="text-[11px] text-dim">{item.phase}</div>
              </div>
              <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${activityColors[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
