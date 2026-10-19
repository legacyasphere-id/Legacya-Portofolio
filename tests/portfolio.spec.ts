import { test, expect } from '@playwright/test'

// ── Navigation ────────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('fixed nav renders brand emblem, wordmark, and primary links', async ({ page, isMobile }) => {
    await page.goto('/')
    const brandLink = page.locator('header a[href="#top"]')
    await expect(brandLink).toContainText('Legacya Sphere')
    await expect(brandLink.locator('img[alt="Legacya Sphere emblem"]')).toBeVisible()

    test.skip(isMobile, 'desktop links hidden on mobile behind burger menu')
    const nav = page.locator('header nav[aria-label="Primary"]')
    await expect(nav.locator('a[href="#about"]')).toBeVisible()
    await expect(nav.locator('a[href="#services"]')).toBeVisible()
    await expect(nav.locator('a[href="#work"]')).toBeVisible()
    await expect(nav.locator('a[href="#creative-work"]')).toBeVisible()
    await expect(nav.locator('a[href="#process"]')).toBeVisible()
    await expect(page.locator('header button.btn-primary')).toContainText('Start a Project')
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
  test('headline renders B2B studio positioning', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Building Brands.')
    await expect(h1).toContainText('Creating Experiences.')
    await expect(h1).toContainText('Shaping What')
  })

  test('hero CTAs trigger project inquiry and explore work', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('#hero button.btn-primary', { hasText: 'Start Your Project' }),
    ).toBeVisible()
    await expect(
      page.locator('#hero a.btn-secondary[href="#work"]', { hasText: 'Explore Our Work' }),
    ).toBeVisible()
  })
})

// ── Services / What We Do ────────────────────────────────────────────────────

test.describe('What We Do', () => {
  test('renders the three core service categories', async ({ page }) => {
    await page.goto('/')
    const services = page.locator('#services')
    await expect(
      services.getByRole('heading', { name: 'Digital Experiences & Business Systems' }),
    ).toBeVisible()
    await expect(
      services.getByRole('heading', { name: 'Advertising & Campaign Assets' }),
    ).toBeVisible()
    await expect(
      services.getByRole('heading', { name: 'Cinematic Video & Visual Production' }),
    ).toBeVisible()
  })
})

// ── Work / case studies ──────────────────────────────────────────────────────

test.describe('Digital Work', () => {
  test('renders a folder tab per curated project, opening its case study', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const tabs = work.locator('[role="tab"]')
    await expect(tabs).toHaveCount(4)

    await expect(work.locator('h3', { hasText: 'InventoryOS' })).toBeVisible()

    const remaining: [string, string][] = [
      ['Hiring & HR', 'AI-CV Screening'],
      ['Healthcare & Clinics', 'BrightPath Dental'],
      ['Restaurants & Hospitality', 'Legacya POS'],
    ]
    for (const [industry, name] of remaining) {
      await tabs.filter({ hasText: industry }).click()
      await expect(work.locator('h3', { hasText: name })).toBeVisible()
    }
  })

  test('every project folder links to a live deployment', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const tabs = work.locator('[role="tab"]')
    const count = await tabs.count()

    for (let i = 0; i < count; i++) {
      await tabs.nth(i).click()
      const link = work.locator('a.link-sweep')
      await expect(link).toHaveCount(1)
      await expect(link).toHaveAttribute('href', /^https:\/\//)
    }
  })
})

// ── Process ──────────────────────────────────────────────────────────────────

test.describe('Process', () => {
  test('renders the five-step collaboration framework', async ({ page }) => {
    await page.goto('/')
    const process = page.locator('#process')
    for (const step of ['Discover', 'Define', 'Create', 'Refine', 'Deliver']) {
      await expect(process.locator('h3', { hasText: step })).toBeVisible()
    }
  })
})

// ── Contact / Project Inquiry ────────────────────────────────────────────────

test.describe('Contact & Project Inquiry', () => {
  test('renders interactive project scope builder and direct email link', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#contact')
    await expect(cta.locator('h2')).toContainText('Tell us about your business')
    await expect(cta.locator('a[href^="mailto:"]').first()).toHaveAttribute(
      'href',
      /mailto:legacyasphere@gmail\.com/,
    )
  })
})

// ── Footer ───────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test('renders the studio structure and real channels', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.getByText('Studio', { exact: true })).toBeVisible()
    await expect(footer.getByText('Inquire by Service', { exact: true })).toBeVisible()
    await expect(footer.getByText('Direct Contact', { exact: true })).toBeVisible()
    await expect(footer.locator('a', { hasText: 'WhatsApp Business' })).toHaveAttribute(
      'href',
      /wa\.me\/6281316303245/,
    )
  })
})
