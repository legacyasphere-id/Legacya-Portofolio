import { test, expect } from '@playwright/test'

// ── Navigation ────────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test('fixed nav renders with brand logo and links', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.locator('header a[href="#top"]')).toContainText('Legacya')

    test.skip(isMobile, 'desktop links hidden on mobile behind burger menu')
    const nav = page.locator('header nav')
    await expect(nav.locator('a[href="#work"]')).toBeVisible()
    await expect(nav.locator('a[href="#services"]')).toBeVisible()
    await expect(nav.locator('a[href="#contact"]')).toBeVisible()
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
  test('headline renders studio positioning', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('We design and build')
    await expect(h1).toContainText('digital systems')
    await expect(h1).toContainText('brands work better.')
  })

  test('hero CTAs point to work and contact', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a.btn-solid[href="#work"]')).toBeVisible()
    await expect(page.locator('a.btn-ghost[href="#contact"]')).toBeVisible()
  })
})

// ── Work deck ─────────────────────────────────────────────────────────────────

test.describe('Work', () => {
  test('renders the curated featured projects', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await expect(work.locator('h3', { hasText: 'InventoryOS' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'AI-CV Screening' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'Sphere OS' })).toBeVisible()
    await expect(work.locator('h3', { hasText: 'Legacya POS' })).toBeVisible()
  })

  test('each project links to a live deployment', async ({ page }) => {
    await page.goto('/')
    const liveLinks = page.locator('#work a.link-sweep', { hasText: 'View live project' })
    await expect(liveLinks).toHaveCount(4)
    for (const href of await liveLinks.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\//)
    }
  })

  test('each project links to its source repo', async ({ page }) => {
    await page.goto('/')
    const sourceLinks = page.locator('#work a.link-sweep', { hasText: 'Source' })
    await expect(sourceLinks).toHaveCount(4)
    for (const href of await sourceLinks.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\/github\.com\/legacyasphere-id/)
    }
  })
})

// ── Services & studio ─────────────────────────────────────────────────────────

test.describe('Services', () => {
  test('renders the four service pillars', async ({ page }) => {
    await page.goto('/')
    const services = page.locator('#services')
    await expect(services.locator('h3', { hasText: 'Web Systems' })).toBeVisible()
    await expect(services.locator('h3', { hasText: 'Data & Backend' })).toBeVisible()
    await expect(services.locator('h3', { hasText: 'AI Co-Engineering' })).toBeVisible()
    await expect(services.locator('h3', { hasText: 'Deploy & Operate' })).toBeVisible()
  })
})

test.describe('Studio', () => {
  test('founder credit is rendered', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#studio')).toContainText('Yoga Pratama Effendi')
  })
})

// ── Contact & footer ──────────────────────────────────────────────────────────

test.describe('Contact', () => {
  test('CTA section has a mailto button', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#contact a[href^="mailto:"]')
    await expect(cta).toHaveAttribute('href', 'mailto:legacyasphere@gmail.com')
  })
})

test.describe('Footer', () => {
  test('social links point to real profiles', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer.locator('a', { hasText: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/legacya.id',
    )
    await expect(footer.locator('a', { hasText: 'GitHub' })).toHaveAttribute(
      'href',
      /github\.com\/legacyasphere-id/,
    )
  })

  test('founder credit appears in studio column', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('footer')).toContainText('Founded by Yoga Pratama Effendi')
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
