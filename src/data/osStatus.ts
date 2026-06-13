export type OSStatusLevel = 'active' | 'production' | 'research' | 'planned'

export interface OSStatusItem {
  id: string
  name: string
  category: string
  detail: string
  status: OSStatusLevel
  version?: string
}

export const OS_STATUS_LABEL: Record<OSStatusLevel, string> = {
  active:     'Active Development',
  production: 'Production',
  research:   'Research',
  planned:    'Planned',
}

/**
 * Current initiatives and development activity across the studio — framed as
 * an operating-system status board rather than a marketing roadmap.
 */
export const osStatus: OSStatusItem[] = [
  {
    id: 'sphere-os',
    name: 'SphereOS',
    category: 'Core Platform',
    detail:
      'Our internal multi-tenant business operating system — the foundation we extend into client platforms, with role-based access and real-time operational data.',
    status: 'active',
    version: 'v2.0',
  },
  {
    id: 'inventory-os',
    name: 'InventoryOS',
    category: 'Operational System',
    detail:
      'Multi-role inventory and stock management platform running in production warehouse operations, replacing manual spreadsheet workflows.',
    status: 'production',
    version: 'v1.4',
  },
  {
    id: 'automation-infra',
    name: 'Automation Infrastructure',
    category: 'Workflow Engine',
    detail:
      'Reusable n8n and API automation pipelines that remove repetitive administrative work and connect fragmented business tools.',
    status: 'active',
  },
  {
    id: 'internal-frameworks',
    name: 'Internal Frameworks',
    category: 'Engineering',
    detail:
      'Shared dashboard, auth, and data-access frameworks that let us stand up new operational systems faster and more reliably.',
    status: 'production',
  },
  {
    id: 'ai-operations',
    name: 'AI Operations Layer',
    category: 'Research',
    detail:
      'Exploring AI as a first-class runtime component inside business systems — assisted decisions, summarization, and operational copilots.',
    status: 'research',
  },
  {
    id: 'client-portals',
    name: 'Client Portal Framework',
    category: 'Platform',
    detail:
      'A standardized portal layer for giving customers structured, secure access to their data, orders, and operational status.',
    status: 'planned',
  },
]
