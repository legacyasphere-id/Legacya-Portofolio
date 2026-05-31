export interface StackCategory {
  category: string
  items: StackItem[]
}

export interface StackItem {
  name: string
  role: string
  tier: 'primary' | 'secondary' | 'utility'
  reason: string
}

export const stack: StackCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', role: 'Primary', tier: 'primary', reason: 'Component architecture for complex dashboard UIs. Ecosystem (Zustand, React Query, Recharts) covers every operational app need.' },
      { name: 'Vue.js', role: 'Secondary', tier: 'secondary', reason: 'Cleaner syntax for content-heavy internal apps. Vue\'s reactive architecture maps to complex multi-step operational forms.' },
      { name: 'TypeScript', role: 'Language', tier: 'primary', reason: 'Strict typing prevents entire classes of runtime bugs. Essential for AI-assisted development — types serve as documentation for Claude.' },
      { name: 'Tailwind CSS', role: 'Styling', tier: 'primary', reason: 'Utility-first keeps design consistent across complex multi-screen dashboards without fighting a design system.' },
      { name: 'Recharts', role: 'Data Viz', tier: 'utility', reason: 'Composable SVG charts with React. Customizable enough for production dashboards.' },
    ],
  },
  {
    category: 'Backend & Database',
    items: [
      { name: 'Supabase', role: 'Core Backend', tier: 'primary', reason: 'PostgreSQL + Auth + Realtime + Storage in one platform. RLS replaces custom auth middleware.' },
      { name: 'PostgreSQL', role: 'Database', tier: 'primary', reason: 'Relational integrity for inventory, order, and supplier data. Foreign keys, indexes, and views.' },
      { name: 'Supabase Realtime', role: 'Live Data', tier: 'utility', reason: 'WebSocket-based Postgres change listeners. Essential for live dashboards and multi-user operational apps.' },
      { name: 'Supabase RLS', role: 'Security', tier: 'utility', reason: 'SQL-level access policies that can\'t be bypassed at the API layer. Role-based access per row.' },
    ],
  },
  {
    category: 'Deployment & CI/CD',
    items: [
      { name: 'Vercel', role: 'Frontend Deploy', tier: 'primary', reason: 'Preview deployments per PR, global edge CDN, zero-config for React/Vue. Build pipeline in 30 seconds.' },
      { name: 'GitHub', role: 'Version Control', tier: 'primary', reason: 'Branch strategy, GitHub Actions for CI, automated deploys on merge.' },
      { name: 'Cloudflare', role: 'Edge / DNS', tier: 'utility', reason: 'DNS management, edge caching, and DDoS protection for static sites.' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'Claude', role: 'Primary AI', tier: 'primary', reason: 'Architecture planning, database schema review, code review, system design analysis. Certified practitioner.' },
      { name: 'Claude Code', role: 'CLI Coding', tier: 'primary', reason: 'AI-native CLI for agentic coding workflows. Hooks, MCP integrations, and context-aware development.' },
      { name: 'GPT / Gemini', role: 'Research AI', tier: 'secondary', reason: 'Research, documentation, alternative architectural opinions. Multiple models prevent single-model blind spots.' },
      { name: 'n8n', role: 'Automation', tier: 'utility', reason: 'Visual workflow automation for integrations, webhook processing, and recurring operational tasks.' },
    ],
  },
]
