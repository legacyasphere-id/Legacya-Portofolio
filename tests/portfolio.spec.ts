import { test, expect } from '@playwright/test'

// ── Navigation ────────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('fixed nav renders brand and primary links', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.locator('header a[href="#top"]')).toContainText('Legacya Sphere')

    test.skip(isMobile, 'desktop links hidden on mobile behind burger menu')
    const nav = page.locator('header nav[aria-label="Primary"]')
    await expect(nav.locator('a[href="#systems"]')).toBeVisible()
    await expect(nav.locator('a[href="#work"]')).toBeVisible()
    await expect(nav.locator('a[href="#os-status"]')).toBeVisible()
    await expect(nav.locator('a[href="#contact"]')).toBeVisible()
    await expect(page.locator('header a.btn-primary[href="#contact"]')).toContainText(
      'Start a Project',
    )
  })

  test('burger menu opens and closes on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'burger only rendered on mobile')
    await page.goto('/')
    const burger = page.locator('button[aria-label="Toggle menu"]')
    await expect(burger).toBeVisible()
    await burger.click()
    await expect(page.locator('nav[aria-label="Mobile"]')).toHaveClass(/open/)
    await burger.click()
    await expect(page.locator('nav[aria-label="Mobile"]')).not.toHaveClass(/open/)
  })
})

// ── Hero ──────────────────────────────────────────────────────────────────────

test.describe('Hero', () => {
  test('headline renders systems positioning', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Building systems')
    await expect(h1).toContainText('scale')
    await expect(h1).toContainText('with your operations.')
  })

  test('hero CTAs point to contact and case studies', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('main a.btn-primary[href="#contact"]', { hasText: 'Discuss Your System' }),
    ).toBeVisible()
    await expect(
      page.locator('a.btn-secondary[href="#work"]', { hasText: 'View Case Studies' }),
    ).toBeVisible()
  })
})

// ── Trust strip ────────────────────────────────────────────────────────────────

test.describe('Trust', () => {
  test('renders the technology foundation', async ({ page }) => {
    await page.goto('/')
    for (const tech of ['Laravel', 'Vue.js', 'Supabase', 'PostgreSQL']) {
      await expect(page.getByText(tech, { exact: true }).first()).toBeVisible()
    }
  })
})

// ── Systems We Build ────────────────────────────────────────────────────────────

test.describe('Systems', () => {
  test('renders the three system pillars', async ({ page }) => {
    await page.goto('/')
    const systems = page.locator('#systems')
    await expect(systems.locator('h3', { hasText: 'Business Operating Systems' })).toBeVisible()
    await expect(systems.locator('h3', { hasText: 'Operational Dashboards' })).toBeVisible()
    await expect(systems.locator('h3', { hasText: 'Automation Infrastructure' })).toBeVisible()
  })
})

// ── Work / case studies ─────────────────────────────────────────────────────────

test.describe('Work', () => {
  test('renders all four real projects', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await expect(work.locator('h3', { hasText: 'InventoryOS' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'Legacya POS UI' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'Hybrid Dashboard' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'daenuna.co' })).toBeVisible()
  })

  test('each case study exposes problem, solution and outcome', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await expect(work.getByText('Problem').first()).toBeVisible()
    await expect(work.getByText('Solution').first()).toBeVisible()
    await expect(work.getByText('Outcome').first()).toBeVisible()
  })

  test('project cards link to live deployments', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('#work a.link-sweep')
    await expect(links).toHaveCount(4)
    for (const href of await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\//)
    }
  })
})

// ── Process ──────────────────────────────────────────────────────────────────────

test.describe('Process', () => {
  test('renders the four-step framework', async ({ page }) => {
    await page.goto('/')
    const process = page.locator('#process')
    await expect(process.locator('h3', { hasText: 'Discover' })).toBeVisible()
    await expect(process.locator('h3', { hasText: 'Architect' })).toBeVisible()
    await expect(process.locator('h3', { hasText: 'Build' })).toBeVisible()
    await expect(process.locator('h3', { hasText: 'Evolve' })).toBeVisible()
  })
})

// ── OS Status ─────────────────────────────────────────────────────────────────────

test.describe('OS Status', () => {
  test('renders the status board with initiatives and badges', async ({ page }) => {
    await page.goto('/')
    const os = page.locator('#os-status')
    await expect(os.locator('h2', { hasText: 'OS Status' })).toBeVisible()
    await expect(os.locator('h3', { hasText: 'SphereOS' })).toBeVisible()
    await expect(os.locator('.badge', { hasText: 'Active Development' }).first()).toBeVisible()
    await expect(os.locator('.badge', { hasText: 'Production' }).first()).toBeVisible()
  })
})

// ── Contact / CTA ───────────────────────────────────────────────────────────────

test.describe('Contact', () => {
  test('closing CTA has the growth headline and a mailto button', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#contact')
    await expect(cta.locator('h2')).toContainText('Let')
    await expect(cta.locator('h2')).toContainText('growth')
    await expect(cta.locator('a[href^="mailto:"]')).toHaveAttribute(
      'href',
      'mailto:legacyasphere@gmail.com',
    )
  })
})

// ── Footer ─────────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('renders the three-column structure', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.getByText('Studio', { exact: true })).toBeVisible()
    await expect(footer.getByText('Capabilities', { exact: true })).toBeVisible()
    await expect(footer.getByText('Connect', { exact: true })).toBeVisible()
  })

  test('connect links point to real channels', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.locator('a', { hasText: 'GitHub' })).toHaveAttribute(
      'href',
      /github\.com\/legacyasphere-id/,
    )
    await expect(footer.locator('a', { hasText: 'Email' })).toHaveAttribute(
      'href',
      /^mailto:/,
    )
  })

  test('bottom line carries the studio positioning', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toContainText(
      'AI-Native Business Systems Studio',
    )
  })
})

// ── Animations ────────────────────────────────────────────────────────────────

test.describe('Scroll reveal', () => {
  test('hero reveal elements become visible on load', async ({ page }) => {
    await page.goto('/')
    const firstLine = page.locator('h1 span').first()
    await expect(firstLine).toHaveClass(/is-visible/)
  })

  test('below-fold sections reveal when scrolled into view', async ({ page }) => {
    await page.goto('/')
    await page.locator('#contact h2').scrollIntoViewIfNeeded()
    await expect(page.locator('#contact h2')).toHaveClass(/is-visible/)
  })
})
