import { test, expect } from '@playwright/test'

// ── Navigation ────────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('fixed nav renders brand and primary links', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.locator('header a[href="#top"]')).toContainText('Legacya Sphere')

    test.skip(isMobile, 'desktop links hidden on mobile behind burger menu')
    const nav = page.locator('header nav[aria-label="Primary"]')
    await expect(nav.locator('a[href="#work"]')).toBeVisible()
    await expect(nav.locator('a[href="#pricing"]')).toBeVisible()
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
    await expect(h1).toContainText('Systems that')
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

// ── Tech stack ─────────────────────────────────────────────────────────────────

test.describe('Tech Stack', () => {
  test('renders the technology marquee and AI logos', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: 'Key Technologies & Platforms' }),
    ).toBeVisible()
    for (const logo of ['React', 'Supabase', 'Claude']) {
      await expect(page.getByAltText(logo, { exact: true }).first()).toBeVisible()
    }
  })
})

// ── Work / case studies ─────────────────────────────────────────────────────────

test.describe('Work', () => {
  test('renders the curated featured projects', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await expect(work.locator('h3', { hasText: 'InventoryOS' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'AI-CV Screening' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'BrightPath Dental' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'Legacya POS' })).toBeVisible()
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

// ── Pricing ───────────────────────────────────────────────────────────────────────

test.describe('Pricing', () => {
  test('renders the three service tiers', async ({ page }) => {
    await page.goto('/')
    const pricing = page.locator('#pricing')
    await expect(pricing.locator('h2', { hasText: 'Find the right build' })).toBeVisible()
    for (const tier of ['Starter', 'Business', 'Enterprise']) {
      await expect(pricing.locator('h3', { hasText: tier })).toBeVisible()
    }
    await expect(pricing.getByText('Rp2.500.000')).toBeVisible()
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
