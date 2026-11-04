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
    await expect(nav.locator('a[href="#ai-workflow"]')).toBeVisible()
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
  test('headline renders AI-native studio positioning', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Business systems.')
    await expect(h1).toContainText('Brand visuals.')
    await expect(h1).toContainText('One AI-native studio.')
  })

  test('hero CTAs and service chooser chips trigger project inquiry and explore work', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.locator('#hero button.btn-primary', { hasText: 'Start a Project' }),
    ).toBeVisible()
    await expect(
      page.locator('#hero a.btn-secondary[href="#work"]', { hasText: 'See My Work' }),
    ).toBeVisible()
    for (const chip of ['Website', 'Internal tool', 'Automation', 'Visuals']) {
      await expect(page.locator('#hero button', { hasText: chip })).toBeVisible()
    }
  })
})

// ── Services / What I Do ─────────────────────────────────────────────────────

test.describe('What I Do', () => {
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

// ── Work / Curve Showcase & Case Studies ─────────────────────────────────────

test.describe('Digital Work & Curve Showcase', () => {
  test('renders the dark curve showcase card with both lines and honest-label badges', async ({
    page,
  }) => {
    await page.goto('/')
    const card = page.getByTestId('curve-showcase-card')
    await expect(card).toBeVisible()

    await expect(card.getByText('My live websites and business systems')).toBeVisible()
    await expect(card.getByText('My campaign visuals and product films')).toBeVisible()
    await expect(card.getByText('Self-initiated reference build · Live demo')).toBeVisible()
    await expect(card.getByText('Concept work · not commissioned by the brand')).toBeVisible()
    await expect(card.getByText('1 / 4', { exact: true })).toBeVisible()
    await expect(card.getByText('1 / 6', { exact: true })).toBeVisible()
    await expect(page.locator('video')).toHaveCount(0)
  })

  test('top curve next button reaches every digital project and syncs the detail panel below', async ({
    page,
  }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const card = work.getByTestId('curve-showcase-card')
    const topRegion = card.getByRole('region', {
      name: 'My live websites and business systems',
    })
    const nextBtn = topRegion.getByRole('button', { name: 'Next project' })
    const detailHeading = work.locator('#work-panel h3')
    const liveLink = work.locator('#work-panel a.link-sweep')

    const expectedNames = [
      'InventoryOS',
      'Talent Evaluation System',
      'BrightPath Clinic Website & Patient Portal',
      'Legacya Restaurant & Kitchen System',
    ]

    for (let i = 0; i < expectedNames.length; i++) {
      await expect(detailHeading).toHaveText(expectedNames[i])
      await expect(liveLink).toHaveCount(1)
      await expect(liveLink).toHaveAttribute('href', /^https:\/\//)
      await nextBtn.click()
    }
    // Loops back to first project
    await expect(detailHeading).toHaveText('InventoryOS')
  })

  test('bottom curve next button cycles creative items and clicking active creative photo opens its modal', async ({
    page,
  }) => {
    await page.goto('/')
    const card = page.getByTestId('curve-showcase-card')
    const bottomRegion = card.getByRole('region', {
      name: 'My campaign visuals and product films',
    })
    const nextBtn = bottomRegion.getByRole('button', { name: 'Next project' })

    await expect(bottomRegion.getByText('Hanasui Cosmetics')).toBeVisible()
    await expect(bottomRegion.getByText('1 / 6')).toBeVisible()

    await nextBtn.click()
    await expect(bottomRegion.getByText('Flame-Grilled Burger')).toBeVisible()
    await expect(bottomRegion.getByText('2 / 6')).toBeVisible()

    const activePhotoBtn = bottomRegion.locator('button[aria-current="true"]')
    await activePhotoBtn.click()
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await expect(modal.locator('h3')).toContainText('Flame-Grilled Burger')
  })

  test('supports Left and Right arrow keys when focus is inside the curve showcase card', async ({
    page,
  }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const card = work.getByTestId('curve-showcase-card')
    const topRegion = card.getByRole('region', {
      name: 'My live websites and business systems',
    })
    const nextBtn = topRegion.getByRole('button', { name: 'Next project' })

    await nextBtn.focus()
    await page.keyboard.press('ArrowRight')
    await expect(work.locator('#work-panel h3')).toHaveText('Talent Evaluation System')

    await page.keyboard.press('ArrowLeft')
    await expect(work.locator('#work-panel h3')).toHaveText('InventoryOS')
  })

  test('labels every project as a self-initiated reference build and never renders TODO(yoga)', async ({
    page,
  }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await expect(work.getByText('Self-initiated reference build · Live demo').first()).toBeVisible()
    await expect(work.getByText('Verified Live Product')).toHaveCount(0)
    await expect(page.getByText('TODO(yoga)')).toHaveCount(0)
  })

  test('nav links Digital Work and Creative Work land on #work card and #creative-work section', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/')
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click()
      await page.locator('nav[aria-label="Mobile"] a[href="#work"]').click()
    } else {
      await page.locator('header nav[aria-label="Primary"] a[href="#work"]').click()
    }
    await expect(page).toHaveURL(/#work$/)
    await expect(page.getByTestId('curve-showcase-card')).toBeInViewport()

    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click()
      await page.locator('nav[aria-label="Mobile"] a[href="#creative-work"]').click()
    } else {
      await page.locator('header nav[aria-label="Primary"] a[href="#creative-work"]').click()
    }
    await expect(page).toHaveURL(/#creative-work$/)
    await expect(page.locator('#creative-work')).toBeInViewport()
  })

  test('curve card tap targets are at least 44px at 390px and page has no horizontal overflow in EN or ID', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const card = page.getByTestId('curve-showcase-card')
    await card.scrollIntoViewIfNeeded()

    const buttons = card.locator('button')
    const btnCount = await buttons.count()
    expect(btnCount).toBe(10)
    for (let i = 0; i < btnCount; i++) {
      const box = await buttons.nth(i).boundingBox()
      expect(box).not.toBeNull()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.width).toBeGreaterThanOrEqual(44)
    }

    const overflowEn = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflowEn).toBe(false)

    await page
      .locator('header button[aria-label="Switch language to Indonesian"]')
      .first()
      .click()
    await expect(card.getByText('Website aktif dan sistem bisnis buatan saya')).toBeVisible()
    await expect(card.getByText('Visual kampanye dan film produk buatan saya')).toBeVisible()

    const overflowId = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflowId).toBe(false)
  })
})

// ── Creative work ────────────────────────────────────────────────────────────

test.describe('Creative Work', () => {
  test('shows campaign visuals by default and only loads video ads when Cinematic Video tab is clicked', async ({ page }) => {
    await page.goto('/')
    const creative = page.locator('#creative-work')
    const cards = creative.locator('article')
    await expect(cards).toHaveCount(3)
    await expect(creative.locator('video')).toHaveCount(0)
    await expect(
      creative.getByText('Concept work · not commissioned by the brand'),
    ).toHaveCount(3)

    await creative
      .getByRole('button', { name: 'Cinematic Video & Visual Production' })
      .click()
    await expect(cards).toHaveCount(3)
    await cards.first().scrollIntoViewIfNeeded()
    await expect(creative.locator('video').first()).toBeAttached()
    expect(await creative.locator('video').count()).toBeGreaterThan(0)
    await expect(
      creative.getByText('Concept work · not commissioned by the brand'),
    ).toHaveCount(3)
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

// ── AI Workflow ──────────────────────────────────────────────────────────────

test.describe('AI Workflow', () => {
  test('renders the four AI workflow steps', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#ai-workflow')
    await expect(section.locator('h2')).toContainText('How I work with AI')
    for (const step of [
      'Brief → structured spec',
      'AI drafts, I direct',
      'Human review gates',
      'You own everything',
    ]) {
      await expect(section.locator('h3', { hasText: step })).toBeVisible()
    }
  })
})

// ── Founder / Training ───────────────────────────────────────────────────────

test.describe('Training', () => {
  test('presents Anthropic courses as training, not verified credentials', async ({ page }) => {
    await page.goto('/')
    const founder = page.locator('#founder')
    await expect(founder.getByText('Anthropic courses completed')).toBeVisible()
    await expect(founder.getByText('Anthropic Academy').first()).toBeVisible()
    await expect(founder.getByText('Verified Credentials')).toHaveCount(0)
  })
})

// ── Contact / Project Inquiry ────────────────────────────────────────────────

test.describe('Contact & Project Inquiry', () => {
  test('renders interactive project scope builder and direct email link', async ({ page }) => {
    await page.goto('/')
    const cta = page.locator('#contact')
    await expect(cta.locator('h2')).toContainText('Tell me about your business')
    await expect(
      cta.getByRole('button', { name: /Send Inquiry via Email \(legacyasphere@gmail\.com\)/ }),
    ).toBeVisible()
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
      /wa\.me\/6285156862140/,
    )
  })
})

// ── Language Toggle (EN | ID) ────────────────────────────────────────────────

test.describe('Language Toggle', () => {
  test('defaults to English H1, switches to Indonesian H1 with lang="id", and persists across reload', async ({
    page,
  }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toContainText('Business systems.')
    await expect(h1).toContainText('Brand visuals.')
    await expect(h1).toContainText('One AI-native studio.')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    const toggleBtn = page.locator(
      'header button[aria-label="Switch language to Indonesian"]',
    )
    await expect(toggleBtn).toBeVisible()
    await toggleBtn.click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(h1).toContainText('Sistem bisnis.')
    await expect(h1).toContainText('Visual brand.')
    await expect(h1).toContainText('Satu studio AI-native.')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'id')
    await expect(h1).toContainText('Sistem bisnis.')
    await expect(h1).toContainText('Visual brand.')
    await expect(h1).toContainText('Satu studio AI-native.')
  })

  test('builds the WhatsApp inquiry link in Indonesian after choosing ID', async ({
    page,
  }) => {
    await page.goto('/')
    await page
      .locator('header button[aria-label="Switch language to Indonesian"]')
      .click()

    await page.evaluate(() => {
      window.addEventListener(
        'click',
        (e) => {
          const anchor = (e.target as HTMLElement).closest('a')
          if (anchor && anchor.href.includes('wa.me')) {
            e.preventDefault()
            ;(window as unknown as { __waHref?: string }).__waHref = anchor.href
          }
        },
        true,
      )
    })

    const cta = page.locator('#contact')
    await cta.locator('#scoper-name').fill('Budi Santoso')
    await cta.locator('#scoper-company').fill('Nusantara Retail')
    await cta.locator('#scoper-contact').fill('+62 812-3456-7890')
    await cta.getByRole('button', { name: /Kirim via WhatsApp/ }).click()

    const waHref = await page.evaluate(
      () => (window as unknown as { __waHref?: string }).__waHref ?? '',
    )
    expect(waHref).toContain('https://wa.me/6285156862140?text=')
    const decodedText = decodeURIComponent(waHref.split('?text=')[1] ?? '')
    expect(decodedText).toContain('Halo Yoga (Legacya Sphere),')
    expect(decodedText).toContain('Layanan yang Diminati: Pengalaman Digital & Sistem Bisnis')
    expect(decodedText).toContain('Tujuan Utama:')
    expect(decodedText).toContain('Budi Santoso')
  })

  test('language toggle is at least 44 px tall on phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const toggleBtn = page
      .locator('header button[aria-label="Switch language to Indonesian"]')
      .first()
    await expect(toggleBtn).toBeVisible()
    const box = await toggleBtn.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })
})
