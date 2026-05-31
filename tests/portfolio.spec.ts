import { test, expect } from '@playwright/test'

// ── Navigation & structure ────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('sticky nav renders with correct links', async ({ page, isMobile }) => {
    test.skip(isMobile, 'nav links are hidden on mobile via md:flex breakpoint')
    await page.goto('/')
    const nav = page.locator('header nav')
    await expect(nav).toBeVisible()
    await expect(nav.locator('text=Founder OS')).toBeVisible()
    await expect(nav.locator('text=OS Status')).toBeVisible()
    await expect(nav.locator('text=Case Studies')).toBeVisible()
    await expect(nav.locator('text=Build Flow')).toBeVisible()
    await expect(nav.locator('text=Evolution')).toBeVisible()
  })

  test('nav logo links back to hero', async ({ page }) => {
    await page.goto('/')
    const logoLink = page.locator('header nav a[aria-label*="Legacya Sphere"]')
    await expect(logoLink).toBeVisible()
    await expect(logoLink).toHaveAttribute('href', '#hero')
  })

  test('"Let\'s Build" CTA is visible in desktop nav', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop-only CTA hidden via md:flex breakpoint')
    await page.goto('/')
    const cta = page.locator('header nav a[href="#contact"]').filter({ hasText: "Let's Build" })
    await expect(cta).toBeVisible()
  })
})

// ── Hero section ──────────────────────────────────────────────────────────────

test.describe('Hero', () => {
  test('headline renders AI-Native Founder OS', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('AI-Native')
    await expect(h1).toContainText('Founder OS')
  })

  test('core identity message renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=I don\'t build features. I build systems.')).toBeVisible()
  })

  test('identity badges are rendered', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=AI-Native Founder')).toBeVisible()
    await expect(page.locator('text=AI-Native System Builder')).toBeVisible()
    await expect(page.locator('text=Product System Thinker')).toBeVisible()
  })

  test('primary CTA points to Founder OS section', async ({ page }) => {
    await page.goto('/')
    const primaryCta = page.locator('a.btn-primary', { hasText: 'Explore Founder OS' }).first()
    await expect(primaryCta).toBeVisible()
    await expect(primaryCta).toHaveAttribute('href', '#founder-os')
  })

  test('system metrics bar shows 4 metrics', async ({ page }) => {
    await page.goto('/')
    // scope all queries to the metrics bar div
    const bar = page.locator('.border-t.border-b.border-border').first()
    await expect(bar.locator('text=Systems Shipped')).toBeVisible()
    await expect(bar.locator('text=Active Builds')).toBeVisible()
    await expect(bar.locator('text=Production Screens')).toBeVisible()
    await expect(bar.locator('text=System Online')).toBeVisible()
  })

  test('availability status indicator is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Available for selective engagements').first()).toBeVisible()
  })
})

// ── Founder OS section ────────────────────────────────────────────────────────

test.describe('Founder OS section', () => {
  test('OS header bar renders with version and status', async ({ page }) => {
    await page.goto('/')
    await page.locator('#founder-os').scrollIntoViewIfNeeded()
    // scope to the top bar inside #founder-os
    const osBar = page.locator('#founder-os .border-b').first()
    await expect(osBar.locator('text=Founder OS')).toBeVisible()
    await expect(osBar.locator('text=v2.0')).toBeVisible()
    await expect(osBar.locator('text=Active')).toBeVisible()
  })

  test('main headline declares "Not a portfolio. A system."', async ({ page }) => {
    await page.goto('/')
    await page.locator('#founder-os').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Not a portfolio.')).toBeVisible()
    await expect(page.locator('text=A system.')).toBeVisible()
  })

  test('OS tagline renders', async ({ page }) => {
    await page.goto('/')
    await page.locator('#founder-os').scrollIntoViewIfNeeded()
    await expect(page.locator('text=The OS beneath every system I ship.')).toBeVisible()
  })

  test('Operating Principles grid renders 4 panels', async ({ page }) => {
    await page.goto('/')
    await page.locator('#founder-os').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Operating Principles')).toBeVisible()
    await expect(page.locator('text=4 modules')).toBeVisible()
  })

  test('Build Workflow pipeline renders 4 stages', async ({ page }) => {
    await page.goto('/')
    await page.locator('#founder-os').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Build Workflow')).toBeVisible()
    await expect(page.locator('text=4 stages')).toBeVisible()
  })
})

// ── OS Snapshot / System State ────────────────────────────────────────────────

test.describe('OS Snapshot (System State)', () => {
  test('eyebrow label is OS Snapshot', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    // eyebrow has class "eyebrow" — scope to that element inside the section
    await expect(page.locator('#os-status .eyebrow')).toContainText('OS Snapshot')
  })

  test('section heading is "System State"', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    await expect(page.locator('h2', { hasText: 'System State' })).toBeVisible()
  })

  test('live dashboard header shows Live status', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Live').first()).toBeVisible()
    await expect(page.locator('text=OS Snapshot').first()).toBeVisible()
  })

  test('Current Focus panel is visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Current Focus')).toBeVisible()
  })

  test('Execution Stack panel is visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Execution Stack')).toBeVisible()
  })

  test('Build Activity panel is visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#os-status').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Build Activity')).toBeVisible()
  })
})

// ── Case Studies section ──────────────────────────────────────────────────────

test.describe('Case Studies', () => {
  test('section heading is "Output Systems."', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Output Systems.')).toBeVisible()
  })

  test('engineering breakdown toggle exists in grid cards', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const toggles = page.locator('button', { hasText: 'Engineering Breakdown' })
    await expect(toggles.first()).toBeVisible()
  })

  test('engineering breakdown expands on click', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const toggle = page.locator('button', { hasText: 'Engineering Breakdown' }).first()
    await toggle.click()
    await expect(page.locator('text=Thinking Process').first()).toBeVisible()
    await expect(page.locator('text=AI Role').first()).toBeVisible()
    await expect(page.locator('text=Architecture').first()).toBeVisible()
    await expect(page.locator('text=Outcome').first()).toBeVisible()
  })

  test('Problem step is always visible without expanding', async ({ page }) => {
    await page.goto('/')
    await page.locator('#projects').scrollIntoViewIfNeeded()
    const problemLabels = page.locator('.border-l-2', { hasText: 'Problem' })
    await expect(problemLabels.first()).toBeVisible()
  })
})

// ── AI Build Flow section ─────────────────────────────────────────────────────

test.describe('AI Build Flow', () => {
  test('section heading is "How each system ships."', async ({ page }) => {
    await page.goto('/')
    await page.locator('#ai-flow').scrollIntoViewIfNeeded()
    await expect(page.locator('h2', { hasText: 'How each system' })).toBeVisible()
  })

  test('Founder OS Process back-link exists', async ({ page }) => {
    await page.goto('/')
    await page.locator('#ai-flow').scrollIntoViewIfNeeded()
    await expect(page.locator('a[href="#founder-os"]', { hasText: 'Founder OS Process' })).toBeVisible()
  })

  test('pipeline nodes render', async ({ page }) => {
    await page.goto('/')
    await page.locator('#ai-flow').scrollIntoViewIfNeeded()
    const flow = page.locator('#ai-flow')
    // use getByText with exact to pick the first visible match across both desktop/mobile layouts
    const aiArch = flow.getByText('AI Architecture').first()
    const aiCode = flow.getByText('AI Coding').first()
    const feedback = flow.getByText('Feedback Loop').first()
    // at least one of each pair (desktop or mobile layout) must exist in DOM
    await expect(aiArch).toBeAttached()
    await expect(aiCode).toBeAttached()
    await expect(feedback).toBeAttached()
  })

  test('Pipeline Tooling divider renders', async ({ page }) => {
    await page.goto('/')
    await page.locator('#ai-flow').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Pipeline Tooling')).toBeVisible()
  })

  test('tool cards render: Claude, Claude Code, n8n', async ({ page }) => {
    await page.goto('/')
    await page.locator('#ai-flow').scrollIntoViewIfNeeded()
    const flow = page.locator('#ai-flow')
    // chip labels in the detail grid are unique to this section
    await expect(flow.locator('.chip-cyan', { hasText: 'Claude' }).first()).toBeVisible()
    await expect(flow.locator('.chip-cyan', { hasText: 'Claude Code' })).toBeVisible()
    await expect(flow.locator('.chip', { hasText: 'n8n' })).toBeVisible()
  })
})

// ── System Evolution (Roadmap) section ───────────────────────────────────────

test.describe('System Evolution', () => {
  test('eyebrow label is "System Evolution"', async ({ page }) => {
    await page.goto('/')
    await page.locator('#roadmap').scrollIntoViewIfNeeded()
    await expect(page.locator('text=System Evolution')).toBeVisible()
  })

  test('headline "Live evolution" is visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#roadmap').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Live evolution')).toBeVisible()
  })

  test('Current and In Progress section headings are visible', async ({ page }) => {
    await page.goto('/')
    await page.locator('#roadmap').scrollIntoViewIfNeeded()
    const roadmap = page.locator('#roadmap')
    // h3 headings inside the roadmap section
    await expect(roadmap.locator('h3', { hasText: 'Current' })).toBeVisible()
    await expect(roadmap.locator('h3', { hasText: 'In Progress' })).toBeVisible()
  })
})

// ── Contact section ───────────────────────────────────────────────────────────

test.describe('Contact / Initiate Build', () => {
  test('eyebrow is "Initiate Build"', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Initiate Build')).toBeVisible()
  })

  test('contact form fields are present', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="project"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('honeypot field is hidden from assistive tech', async ({ page }) => {
    await page.goto('/')
    const honeypot = page.locator('input[name="website_url"]')
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
    await expect(honeypot).toHaveAttribute('autocomplete', 'off')
  })
})

// ── Footer ────────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('big wordmark renders', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer', { hasText: 'Legacya Sphere' }).first()).toBeVisible()
  })

  test('footer nav columns are present', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer h4', { hasText: 'Navigation' })).toBeVisible()
    await expect(page.locator('footer h4', { hasText: 'Services' })).toBeVisible()
    await expect(page.locator('footer h4', { hasText: 'Connect' })).toBeVisible()
  })

  test('footer copyright text is present', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('text=© 2026 Legacya Sphere')).toBeVisible()
  })

  test('footer availability status is shown', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer', { hasText: 'Available for selective engagements' })).toBeVisible()
  })
})

// ── OG meta tags ──────────────────────────────────────────────────────────────

test.describe('Open Graph meta tags', () => {
  test('og:title is set', async ({ page }) => {
    await page.goto('/')
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()
  })

  test('og:description is set', async ({ page }) => {
    await page.goto('/')
    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDesc).toBeTruthy()
  })
})

// ── Accessibility basics ──────────────────────────────────────────────────────

test.describe('Accessibility', () => {
  test('page has a single h1', async ({ page }) => {
    await page.goto('/')
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBe(1)
  })

  test('all images have alt attributes', async ({ page }) => {
    await page.goto('/')
    const imgs = page.locator('img')
    const count = await imgs.count()
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute('alt')
      // alt="" is acceptable for decorative images
      expect(alt).not.toBeNull()
    }
  })

  test('nav has landmark role', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav').first()).toBeVisible()
  })
})

// ── Mobile viewport ───────────────────────────────────────────────────────────

test.describe('Mobile layout', () => {
  test('mobile contact CTA is present in DOM', async ({ page }) => {
    await page.goto('/')
    // md:hidden CTA exists in DOM even if not visible at desktop width
    const mobileLink = page.locator('header nav a[href="#contact"]').last()
    // verify it exists and has correct href (visibility controlled by CSS breakpoint)
    await expect(mobileLink).toHaveAttribute('href', '#contact')
  })
})
