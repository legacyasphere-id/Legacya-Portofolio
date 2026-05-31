const flowNodes = [
  {
    id: 'idea',
    icon: '◈',
    label: 'Idea',
    sublabel: 'Problem space defined',
    color: 'border-purple/40 bg-purple/5 text-purple',
    iconBg: 'bg-purple/10',
  },
  {
    id: 'ai-architecture',
    icon: '⬡',
    label: 'AI Architecture',
    sublabel: 'Schema + API design',
    color: 'border-cyan/40 bg-cyan/5 text-cyan',
    iconBg: 'bg-cyan/10',
  },
  {
    id: 'ai-coding',
    icon: '</>',
    label: 'AI Coding',
    sublabel: 'Claude Code + review',
    color: 'border-cyan/40 bg-cyan/5 text-cyan',
    iconBg: 'bg-cyan/10',
  },
  {
    id: 'deployment',
    icon: '↑',
    label: 'Deployment',
    sublabel: 'Vercel + Supabase',
    color: 'border-green/40 bg-green/5 text-green',
    iconBg: 'bg-green/10',
  },
  {
    id: 'feedback',
    icon: '⟳',
    label: 'Feedback Loop',
    sublabel: 'Iterate with data',
    color: 'border-purple/40 bg-purple/5 text-purple',
    iconBg: 'bg-purple/10',
  },
]

export function AIFlow() {
  return (
    <div className="space-y-10">
      {/* Flow diagram */}
      <div className="relative">
        {/* Desktop: horizontal */}
        <div className="hidden lg:flex items-center gap-0">
          {flowNodes.map((node, idx) => (
            <div key={node.id} className="flex items-center flex-1">
              <div className={`flex-1 rounded-xl border p-5 ${node.color} relative`}>
                <div className={`w-8 h-8 rounded-lg ${node.iconBg} flex items-center justify-center font-mono text-sm mb-3`}>
                  {node.icon}
                </div>
                <div className="text-[14px] font-semibold text-text">{node.label}</div>
                <div className="text-[11px] mt-1 opacity-70">{node.sublabel}</div>
              </div>
              {idx < flowNodes.length - 1 && (
                <div className="flex items-center px-2 text-border flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden">
          {flowNodes.map((node, idx) => (
            <div key={node.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-lg ${node.iconBg} flex items-center justify-center font-mono text-sm flex-shrink-0 border ${node.color}`}>
                  {node.icon}
                </div>
                {idx < flowNodes.length - 1 && (
                  <div className="w-px flex-1 my-1 bg-border" style={{ minHeight: 24 }} />
                )}
              </div>
              <div className={`mb-4 flex-1 rounded-xl border p-4 ${node.color}`}>
                <div className="text-[14px] font-semibold text-text">{node.label}</div>
                <div className="text-[12px] mt-0.5 opacity-70">{node.sublabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail grid — tools active in this pipeline */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-dim">Pipeline Tooling</span>
        <div className="flex-1 h-px bg-border" />
        <span className="font-mono text-[10px] text-dim">active across all stages</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-base p-4">
          <div className="chip-cyan mb-3">Claude</div>
          <p className="text-[12px] text-muted">Architecture planning, database design, API contracts, code review, system analysis — across all 4 workflow stages.</p>
        </div>
        <div className="card-base p-4">
          <div className="chip-cyan mb-3">Claude Code</div>
          <p className="text-[12px] text-muted">Agentic CLI for AI-native development. Hooks, MCP integrations, and context-aware coding in the terminal.</p>
        </div>
        <div className="card-base p-4">
          <div className="chip-purple mb-3">GPT + Gemini</div>
          <p className="text-[12px] text-muted">Research, documentation, alternative approaches. Multiple models prevent single-model architectural blind spots.</p>
        </div>
        <div className="card-base p-4">
          <div className="chip mb-3">n8n</div>
          <p className="text-[12px] text-muted">Automation workflows, integration pipelines, webhook handling. Operational tasks that run without server code.</p>
        </div>
        <div className="card-base p-4">
          <div className="chip mb-3">GitHub</div>
          <p className="text-[12px] text-muted">Version control, CI/CD, branch strategy. Every project version-controlled and deployed on merge.</p>
        </div>
        <div className="card-base p-4">
          <div className="chip-green mb-3">Vercel + Supabase</div>
          <p className="text-[12px] text-muted">Production deployment stack. Preview environments per PR, global CDN, PostgreSQL + realtime backend.</p>
        </div>
      </div>
    </div>
  )
}
