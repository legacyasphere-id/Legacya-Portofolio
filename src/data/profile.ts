import type { Profile } from '../types/profile'
import { identity } from '../core/identity'

export const profile: Profile = {
  name:         identity.name,
  title:        identity.title,
  role:         `Founder · ${identity.company}`,
  location:     identity.location,
  timezone:     identity.timezone,
  bio:          identity.description,
  tagline:      identity.tagline,
  email:        identity.social.email,
  github:       identity.social.github,
  linkedin:     identity.social.linkedin,
  fiverr:       identity.social.fiverr,
  availability: identity.availability,
  photo:        identity.assets.photo,
  logo:         identity.assets.logo,
  identities:   [...identity.badges],
  coreMessage:  identity.coreMessage,
  // Execution tools (not identity attributes)
  coreStack:    [...identity.executionLayers.tools],
  aiTools:      [...identity.executionLayers.coEngineer],
  languages:    [...identity.languages],
  credentials: [
    {
      id:          'hv8dnv6of7et',
      title:       'Claude 101',
      issuer:      'Anthropic',
      date:        'May 2026',
      description: 'Certified practitioner of Claude AI, issued directly by Anthropic. The foundation under every AI workflow I ship.',
      pdfUrl:      '/assets/certificates/claude-101-anthropic.pdf',
      imageUrl:    '/img-05.webp',
    },
    {
      id:          'claude-code-101',
      title:       'Claude Code 101',
      issuer:      'Anthropic',
      date:        '2026',
      description: 'Certified in AI-native CLI development workflows using Claude Code — agentic coding, hooks, and MCP integrations.',
      pdfUrl:      '/assets/certificates/claude-code-101-anthropic.pdf',
    },
  ],
}
