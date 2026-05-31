import type { Roadmap } from '../types/roadmap'

export const roadmap: Roadmap = {
  lastUpdated: 'May 2026',
  current: [
    {
      id: 'typescript-strict',
      title: 'TypeScript — Strict Mode Mastery',
      detail: 'Migrating all projects to strict TypeScript. Using types as AI communication layer.',
      category: 'learning',
      progress: 75,
    },
    {
      id: 'claude-code-workflows',
      title: 'Claude Code — AI-Native CLI Workflows',
      detail: 'Anthropic\'s agentic coding tool. Hooks, MCP integrations, and context-aware development.',
      category: 'learning',
      progress: 80,
    },
    {
      id: 'inventory-os-v2',
      title: 'InventoryOS v2 — Multi-Tenant Backend',
      detail: 'Expanding to full multi-organization support with isolated RLS policies per tenant.',
      category: 'building',
      progress: 40,
    },
  ],
  inProgress: [
    {
      id: 'postgres-optimization',
      title: 'PostgreSQL Query Optimization',
      detail: 'B-tree vs GiST indexes, EXPLAIN ANALYZE, partial indexes for high-frequency dashboard queries.',
      category: 'learning',
      progress: 50,
    },
    {
      id: 'edge-functions',
      title: 'Supabase Edge Functions + SSR',
      detail: 'Moving compute closer to the database to reduce round-trips in high-frequency dashboards.',
      category: 'exploring',
      progress: 30,
    },
    {
      id: 'ddia-reading',
      title: 'Designing Data-Intensive Applications',
      detail: 'Building intuition for distributed systems, replication, and consistency patterns — Kleppmann.',
      category: 'reading',
      progress: 60,
    },
  ],
  planned: [
    {
      id: 'ai-native-architecture',
      title: 'AI-Native Architecture Patterns',
      detail: 'Designing systems where AI is a first-class runtime component, not just a dev tool.',
      category: 'experiment',
    },
    {
      id: 'react-server-components',
      title: 'React Server Components',
      detail: 'Exploring RSC for reducing client bundle size in data-heavy operational dashboards.',
      category: 'exploring',
    },
    {
      id: 'n8n-advanced-workflows',
      title: 'Advanced n8n Automation Pipelines',
      detail: 'Multi-step AI-powered workflows with Claude API integration for business process automation.',
      category: 'experiment',
    },
  ],
}
