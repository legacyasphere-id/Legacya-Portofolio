import type { OSSnapshot, StatusItem, ActivityItem } from '../types/os'

interface OSStatusProps {
  snapshot: OSSnapshot
}

const statusColors: Record<StatusItem['status'], string> = {
  active: 'text-green border-green/20 bg-green/5',
  paused: 'text-purple border-purple/20 bg-purple/5',
  done:   'text-dim border-border bg-raised',
}

const activityColors: Record<ActivityItem['status'], string> = {
  building:  'text-cyan border-cyan/20 bg-cyan/5',
  deployed:  'text-green border-green/20 bg-green/5',
  iterating: 'text-purple border-purple/20 bg-purple/5',
  planning:  'text-muted border-border bg-raised',
}

export function OSStatus({ snapshot }: OSStatusProps) {
  return (
    <div className="space-y-4">
      {/* Dashboard header bar */}
      <div className="card-base px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="status-dot-green animate-pulse" />
            <span className="font-mono text-[11px] text-green uppercase tracking-wider">Live</span>
          </div>
          <span className="font-mono text-[10px] text-border">|</span>
          <span className="font-mono text-[10px] text-dim uppercase tracking-wider">OS Snapshot</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] text-dim">
          <span>{snapshot.currentFocus.length} active focus</span>
          <span className="hidden sm:block">{snapshot.tools.filter(t => t.tier === 'primary').length} primary tools</span>
          <span>{snapshot.projectActivity.filter(a => a.status === 'building' || a.status === 'iterating').length} building</span>
        </div>
      </div>

      {/* Main dashboard grid: Current Focus spans left, 3 panels on right */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* Current Focus — dominant: spans full height on left, 2 cols wide on lg */}
        <div className="lg:col-span-1 card-base p-6 flex flex-col gap-5" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.04) 0%, transparent 60%)' }}>
          <div className="flex items-center gap-2">
            <span className="status-dot-cyan animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-cyan">Current Focus</span>
          </div>
          <div className="flex-1 space-y-5">
            {snapshot.currentFocus.map((item, idx) => (
              <div key={item.label} className={idx > 0 ? 'border-t border-border pt-5' : ''}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-[15px] font-semibold text-text leading-snug">{item.label}</div>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded border flex-shrink-0 ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-[12px] text-muted leading-relaxed">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: 3 stacked panels */}
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">

          {/* Active Learning */}
          <div className="card-base p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-purple mb-4">Active Learning</div>
            <div className="space-y-4">
              {snapshot.activeLearning.map((item, idx) => (
                <div key={item.label} className={idx > 0 ? 'border-t border-border pt-4' : ''}>
                  <div className="text-[13px] font-medium text-text leading-snug">{item.label}</div>
                  <div className="text-[11px] text-muted mt-1 leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Stack (formerly "Tools Active" — no CV framing) */}
          <div className="card-base p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">Execution Stack</div>
            <div className="space-y-3">
              {snapshot.tools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[13px] font-medium text-text">{tool.name}</div>
                    <div className="text-[10px] text-dim leading-tight mt-0.5">{tool.role}</div>
                  </div>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border flex-shrink-0 ${
                    tool.tier === 'primary' ? 'chip-cyan' : tool.tier === 'secondary' ? 'chip-purple' : 'chip'
                  }`}>
                    {tool.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Activity */}
          <div className="card-base p-5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-4">Build Activity</div>
            <div className="space-y-3">
              {snapshot.projectActivity.map((item, idx) => (
                <div key={item.project} className={`flex items-start justify-between gap-2 ${idx > 0 ? 'border-t border-border pt-3' : ''}`}>
                  <div>
                    <div className="text-[13px] font-medium text-text">{item.project}</div>
                    <div className="text-[10px] text-dim mt-0.5">{item.phase}</div>
                  </div>
                  <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border flex-shrink-0 mt-0.5 ${activityColors[item.status]}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
