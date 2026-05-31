import { identity } from './identity'

export const siteConfig = {
  title:   identity.company,
  tagline: identity.founderOS.name,
  url:     'https://legacyasphere.com',
  author:  identity.name,
  nav: [
    { label: 'Founder OS',   href: '#founder-os' },
    { label: 'OS Status',    href: '#os-status'  },
    { label: 'Case Studies', href: '#projects'   },
    { label: 'Build Flow',   href: '#ai-flow'    },
    { label: 'Evolution',    href: '#roadmap'    },
  ],
  social: identity.social,
}
