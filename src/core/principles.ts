import type { Principle } from '../types/os'

export const principles: Principle[] = [
  {
    id: 'systems-thinking',
    title: 'Systems Thinking',
    description: 'Data flows before UI. Schema before code. Understand the whole system before touching a single component.',
    icon: '⬡',
  },
  {
    id: 'ai-assisted-dev',
    title: 'AI-Assisted Development',
    description: 'AI is a co-engineer, not a shortcut. Claude reviews architecture, schemas, and code the same way a senior engineer would.',
    icon: '◈',
  },
  {
    id: 'rapid-iteration',
    title: 'Rapid Iteration',
    description: 'Ship fast, learn faster. Build the smallest version that validates the core assumption, then iterate with data.',
    icon: '⟳',
  },
  {
    id: 'automation-mindset',
    title: 'Automation Mindset',
    description: 'Any process done more than twice should be automated. Tooling, CI/CD, and workflows are first-class concerns.',
    icon: '⚙',
  },
]
