<div align="center">

<br />

<img src="public/img-15.webp" alt="Legacya Sphere" width="68" />

<br /><br />

# Legacya Sphere · AI-Native Studio for Systems & Brand

### Business systems. Brand visuals. One AI-native studio.

*Websites, internal tools and AI automations, plus the campaign visuals that go with them.*

<br />

[![Live Site](https://img.shields.io/badge/Live-legacya--portofolio.vercel.app-2F4F7F?style=flat-square&logo=vercel&logoColor=white)](https://legacya-portofolio.vercel.app)
[![GitHub Pages](https://img.shields.io/badge/Mirror-GitHub_Pages-2F4F7F?style=flat-square&logo=github&logoColor=white)](https://legacyasphere-id.github.io/Legacya-Portofolio/)
[![React](https://img.shields.io/badge/React-19-3178C6?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-2F4F7F?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-2F4F7F?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

<br />

</div>

---

## Overview

This is the studio website and portfolio for **Legacya Sphere**, the one-founder studio I run from Bekasi, Indonesia (Yoga Pratama Effendi).

I build business websites, internal tools and AI automations, and create the campaign visuals and short-form video that sell them. The site is written for business owners, not developers, so the copy stays in plain business language.

The site is a static React single-page app. There is no backend: project inquiries are composed in the browser and sent through WhatsApp or email.

---

## How the work is labeled

Every piece of work on the site says exactly what it is. This is the most important rule in the repo.

| Label | Where | Meaning |
|-------|-------|---------|
| **Self-initiated reference build · Live demo** | `WorkSection` (`engagement: 'reference'`) | Systems I designed and built myself to show capability. Not client work. |
| **Concept work · not commissioned by the brand** | `CreativeWorkSection` (`engagement: 'concept'`) | Campaign studies made on my own initiative. Brand names shown belong to their owners. |
| **Client project** | `WorkSection` (`engagement: 'commissioned'`) | Real paid work. Hidden until `SHOW_CLIENT_CASE` is turned on with approved facts. |
| **Training · Anthropic courses completed** | `FounderSection` | Course completion certificates from Anthropic Academy. Not professional certifications. |

### Feature flags

Defined in `src/core/identity.ts`. Both stay `false` until the `TODO(yoga)` data they gate is real and approved.

| Flag | Gates |
|------|-------|
| `SHOW_PRICING` | "Starting from" prices on the service cards in `SolutionsSection` |
| `SHOW_CLIENT_CASE` | The Gudang Variasi 712 client case in `src/data/projects.ts` |

Search the codebase for `TODO(yoga)` to find every missing fact.

### Copy rules

- First person ("I build", "Tell me about your business"). It is one founder, not an agency "we".
- No em dashes in customer-facing copy.
- No technical jargon in customer-facing files. `npm test` (`src/core/inquiry.test.ts`) fails if words like PostgreSQL, Prisma, Supabase or JWT appear, or if an em dash slips in.
- Never invent client names, testimonials, metrics, prices or results.

---

## Website Structure

Composed in order by `src/App.tsx`:

| # | Section | Component | Description |
|---|---------|-----------|-------------|
| 0 | **Navigation** | `SiteNav`, `SectionGuide` | Fixed glass header with section links and a "Start a Project" action, plus the side section guide |
| 1 | **Hero** | `HeroSection` | "Business systems. Brand visuals. One AI-native studio." with a 4-pillar strip: Systems, Automation & AI, Campaign visuals, Short-form video |
| 2 | **About** | `StudioIntroSection` | Who the studio works with and how |
| 3 | **Services** | `SolutionsSection` | Three service pillars. Prices are hidden behind `SHOW_PRICING` |
| 4 | **Digital Work** | `WorkSection` | Four self-initiated reference builds with live demos (InventoryOS, Allure Talent Evaluation System, BrightPath Clinic, Legacya Restaurant & Kitchen System) |
| 5 | **Creative Work** | `CreativeWorkSection` | Six concept campaign studies (images and MP4 films), each badged as concept work |
| 6 | **Process** | `ProcessSection` | Five steps: Discover, Define, Create, Refine, Deliver |
| 7 | **AI Workflow** | `AIWorkflowSection` | How AI is used: brief to spec, AI drafts and I direct, human review gates, you own everything |
| 8 | **Why Legacya** | `WhyLegacyaSection` | Practical reasons to work with one partner across digital and creative |
| 9 | **Founder** | `FounderSection` | Founder profile, Anthropic training certificates, contact links |
| 10 | **Project Inquiry** | `CTASection` | Scope builder that composes a brief and sends it by WhatsApp or email |
| 11 | **Footer** | `Footer` | Navigation, "What I Do", "How I Work" and contact channels |

---

## Design System

A warm stone canvas paired with a deep architectural blue. Tokens live in `src/index.css`.

| Token | Hex | Purpose |
|-------|-----|---------|
| `bg` | `#F5F0E8` | Warm stone page canvas |
| `surface` | `#FAF7F2` | Elevated cards and content containers |
| `raised` | `#F0EADF` | Subtle section and pill elevation |
| `border` | `#E5DDD0` | Hairline dividers, cards, inputs |
| `text` | `#181818` | Headlines and primary copy |
| `muted` | `#66625D` | Supporting descriptions |
| `dim` | `#9A958C` | Metadata and labels |
| `blue` | `#5E7EBE` | Secondary blue accent and highlights |
| `blue-deep` | `#2F4F7F` | Primary blue for actions, headlines and badges |
| `blue-dark` | `#26416B` | Hover state for deep blue |

---

## Project Structure

```text
Legacya-Portofolio/
├── public/
│   ├── creative-work/            # Concept campaign visuals (.webp), posters and faststart MP4s
│   ├── assets/certificates/      # Anthropic Academy course certificates (.webp previews + .pdf)
│   ├── logos/                    # Tool logos (SVG), not used by the current site
│   ├── logo.png                  # Circular emblem (navbar, footer)
│   ├── img-04.webp               # Founder portrait, also the Open Graph image
│   ├── img-15.webp               # Full brand mark
│   └── img-16..23.webp           # Reference build screenshots
├── src/
│   ├── core/
│   │   ├── identity.ts           # Studio identity, contact channels, feature flags, navigation events
│   │   ├── site.ts               # SITE_URL and OG_IMAGE_URL used in index.html
│   │   ├── inquiry.ts            # Inquiry validation and WhatsApp/email brief composer
│   │   └── inquiry.test.ts       # Unit tests and customer-facing copy audit
│   ├── data/
│   │   ├── projects.ts           # Digital work (reference builds + hidden client case)
│   │   └── creativeWork.ts       # Concept campaign studies
│   ├── components/               # SiteNav, SectionGuide, Footer
│   ├── sections/                 # One file per page section (see table above)
│   ├── hooks/useScrollReveal.ts  # Reveal-on-scroll for [data-animate] elements
│   ├── types/project.ts          # Shared TypeScript interfaces
│   ├── utils/asset.ts            # BASE_URL-aware asset resolver for Vercel and GitHub Pages
│   ├── App.tsx                   # Root layout composition
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Tailwind v4 theme tokens and component utilities
├── tests/portfolio.spec.ts       # Playwright end-to-end tests (desktop + mobile)
├── index.html                    # Entry HTML with SEO, Open Graph and JSON-LD
├── vite.config.ts                # Vite config: base path per target, %SITE_URL% injection
├── playwright.config.ts          # E2E config (runs against `npm run preview`)
├── vercel.json                   # Vercel SPA routing and cache headers
└── .github/workflows/deploy.yml  # GitHub Actions validation and Pages deployment
```

---

## Getting Started

```bash
git clone https://github.com/legacyasphere-id/Legacya-Portofolio.git
cd Legacya-Portofolio

npm install           # install dependencies
npm run dev           # dev server on http://localhost:3000
npm run lint          # type-check (tsc --noEmit)
npm test              # unit tests and copy audit
npm run build         # production bundle into dist/
npm run test:e2e      # Playwright tests against a preview build (run `npm run build` first)
```

`playwright.config.ts` points `executablePath` at the Chromium bundled in the Claude Code cloud environment. On another machine, remove that line and run `npx playwright install chromium` once.

---

## Deployment

### Vercel (primary)
Build command: `npm run build` · Output directory: `dist`

### GitHub Pages (mirror)
`.github/workflows/deploy.yml` validates sources and media, runs `npm ci && npm run build`, and deploys `dist/` on every push to `main`. When `GITHUB_ACTIONS` is set, Vite builds with the base path `/Legacya-Portofolio/`.

### Notes
- Canonical, Open Graph and JSON-LD URLs come from `SITE_URL` in `src/core/site.ts`. Change it there when the custom domain goes live.
- Renaming the repository breaks the GitHub Pages base path. Update `base` in `vite.config.ts` and the workflow if you rename it.

---

## Author

**Yoga Pratama Effendi**
Founder · Legacya Sphere · Bekasi, Indonesia · GMT+7

[![GitHub](https://img.shields.io/badge/GitHub-legacyasphere--id-2F4F7F?style=flat-square&logo=github&logoColor=white)](https://github.com/legacyasphere-id)
[![Email](https://img.shields.io/badge/Email-legacyasphere%40gmail.com-2F4F7F?style=flat-square&logo=gmail&logoColor=white)](mailto:legacyasphere@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yoga_Pratama_Effendi-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yoga-pratamaeffendi-59b376245)

---

## License

[MIT](LICENSE) for the code. Studio copy and visuals belong to Legacya Sphere. Brand names shown in concept work belong to their owners.
