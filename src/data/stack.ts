import { identity } from '../core/identity'

export interface StackCategory {
  layer: string
  description: string
  items: StackItem[]
}

export interface StackItem {
  name:   string
  role:   string
  tier:   'primary' | 'secondary' | 'utility'
  reason: string
}

/**
 * Stack is organized as execution layers — not identity attributes.
 * The builder's identity comes from identity.ts; these are the tools used to execute.
 */
export const stack: StackCategory[] = [
  {
    layer:       'Execution Layer',
    description: 'Frontend tooling for building operational interfaces and dashboards.',
    items: [
      {
        name:   'React',
        role:   'Primary UI',
        tier:   'primary',
        reason: 'Component architecture for complex dashboard UIs. Ecosystem (Zustand, React Query, Recharts) covers every operational app need.',
      },
      {
        name:   'TypeScript',
        role:   'Language',
        tier:   'primary',
        reason: `Strict typing prevents entire classes of runtime bugs. Essential for ${identity.founderOS.name} workflows — types serve as documentation for Claude.`,
      },
      {
        name:   'Vue.js',
        role:   'Secondary UI',
        tier:   'secondary',
        reason: 'Cleaner syntax for content-heavy internal apps. Reactive architecture maps to complex multi-step operational forms.',
      },
      {
        name:   'Tailwind CSS',
        role:   'Styling',
        tier:   'primary',
        reason: 'Utility-first keeps design consistent across complex multi-screen dashboards without fighting a design system.',
      },
      {
        name:   'Recharts',
        role:   'Data Viz',
        tier:   'utility',
        reason: 'Composable SVG charts with React. Customizable enough for production dashboards.',
      },
    ],
  },
  {
    layer:       'Data Layer',
    description: 'Backend and database tooling for operational data integrity and real-time state.',
    items: [
      {
        name:   'Supabase',
        role:   'Backend Platform',
        tier:   'primary',
        reason: 'PostgreSQL + Auth + Realtime + Storage in one platform. RLS replaces custom auth middleware.',
      },
      {
        name:   'PostgreSQL',
        role:   'Database',
        tier:   'primary',
        reason: 'Relational integrity for inventory, order, and supplier data. Foreign keys, indexes, and views — not a document store afterthought.',
      },
      {
        name:   'Supabase Realtime',
        role:   'Live Data',
        tier:   'utility',
        reason: 'WebSocket-based Postgres change listeners. Essential for live dashboards and multi-user operational apps.',
      },
      {
        name:   'Supabase RLS',
        role:   'Security',
        tier:   'utility',
        reason: 'SQL-level access policies that can\'t be bypassed at the API layer. Role-based access per row.',
      },
    ],
  },
  {
    layer:       'Deployment Layer',
    description: 'CI/CD and infrastructure tooling for reliable, zero-downtime production delivery.',
    items: [
      {
        name:   'Vercel',
        role:   'Frontend Deploy',
        tier:   'primary',
        reason: 'Preview deployments per PR, global edge CDN, zero-config for React/Vue. Build pipeline in 30 seconds.',
      },
      {
        name:   'GitHub',
        role:   'Version Control + CI',
        tier:   'primary',
        reason: 'Branch strategy, GitHub Actions for CI, automated deploys on merge.',
      },
      {
        name:   'Cloudflare',
        role:   'Edge / DNS',
        tier:   'utility',
        reason: 'DNS management, edge caching, and DDoS protection for static sites.',
      },
    ],
  },
  {
    layer:       'Co-Engineer Layer',
    description: `AI tools used as co-engineers — not shortcuts. Part of the ${identity.founderOS.name} workflow at every stage.`,
    items: [
      {
        name:   'Claude',
        role:   'Primary Co-Engineer',
        tier:   'primary',
        reason: 'Architecture planning, database schema review, code review, system design analysis. Certified practitioner.',
      },
      {
        name:   'Claude Code',
        role:   'CLI Co-Engineer',
        tier:   'primary',
        reason: 'AI-native CLI for agentic coding workflows. Hooks, MCP integrations, and context-aware development.',
      },
      {
        name:   'GPT / Gemini',
        role:   'Research Partner',
        tier:   'secondary',
        reason: 'Research, documentation, alternative architectural opinions. Multiple models prevent single-model blind spots.',
      },
      {
        name:   'n8n',
        role:   'Automation Engine',
        tier:   'utility',
        reason: 'Visual workflow automation for integrations, webhook processing, and recurring operational tasks.',
      },
    ],
  },
]
