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

// ── Work / case studies ──────────────────────────────────────────────────────

test.describe('Digital Work & Curve Showcase', () => {
  test('renders the light curve showcase card and cycles all 4 reference builds into #work-panel', async ({
    page,
  }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const digitalRow = work.getByTestId('curve-row-digital')
    const nextBtn = digitalRow.locator('button.cs-btn.cs-nx')
    const prevBtn = digitalRow.locator('button.cs-btn.cs-pl')
    const panel = work.locator('#work-panel')

    await expect(digitalRow.locator('.cs-title')).toHaveText('InventoryOS')
    await expect(digitalRow.locator('.cs-cnt')).toHaveText('1 / 4')
    await expect(panel.locator('h3', { hasText: 'InventoryOS' })).toBeVisible()

    const expectedSequence: [string, string][] = [
      ['Talent Evaluation System', '2 / 4'],
      ['BrightPath Clinic Website & Patient Portal', '3 / 4'],
      ['Legacya Restaurant & Kitchen System', '4 / 4'],
    ]

    for (const [name, counter] of expectedSequence) {
      await nextBtn.click()
      await expect(digitalRow.locator('.cs-title')).toHaveText(name)
      await expect(digitalRow.locator('.cs-cnt')).toHaveText(counter)
      await expect(panel.locator('h3', { hasText: name })).toBeVisible()
    }

    // Wrap back to first and test Previous button
    await nextBtn.click()
    await expect(digitalRow.locator('.cs-title')).toHaveText('InventoryOS')
    await expect(digitalRow.locator('.cs-cnt')).toHaveText('1 / 4')

    await nextBtn.click()
    await expect(digitalRow.locator('.cs-title')).toHaveText('Talent Evaluation System')
    await prevBtn.click()
    await expect(digitalRow.locator('.cs-title')).toHaveText('InventoryOS')
  })

  test('supports clicking side neighbor photos and keyboard ArrowLeft/ArrowRight on both rows', async ({
    page,
  }) => {
    await page.goto('/')
    const digitalRow = page.getByTestId('curve-row-digital')
    const creativeRow = page.getByTestId('curve-row-creative')

    // Click right neighbor photo on row 1 (top-left of side card, outside the centered round button)
    await digitalRow.locator('button.cs-c.cs-side.cs-nx').click({ position: { x: 75, y: 20 } })
    await expect(digitalRow.locator('.cs-title')).toHaveText('Talent Evaluation System')
    await expect(digitalRow.locator('.cs-cnt')).toHaveText('2 / 4')

    // Keyboard ArrowRight / ArrowLeft on row 1
    await digitalRow.focus()
    await page.keyboard.press('ArrowRight')
    await expect(digitalRow.locator('.cs-title')).toHaveText(
      'BrightPath Clinic Website & Patient Portal',
    )
    await page.keyboard.press('ArrowLeft')
    await expect(digitalRow.locator('.cs-title')).toHaveText('Talent Evaluation System')

    // Row 2 navigation: button, neighbor photo, keyboard, and center photo modal open
    await expect(creativeRow.locator('.cs-title')).toHaveText('Hanasui Cosmetics')
    await expect(creativeRow.locator('.cs-cnt')).toHaveText('1 / 6')

    await creativeRow.locator('button.cs-btn.cs-nx').click()
    await expect(creativeRow.locator('.cs-title')).toHaveText('Flame-Grilled Burger')
    await expect(creativeRow.locator('.cs-cnt')).toHaveText('2 / 6')

    await creativeRow.locator('button.cs-btn.cs-pl').click()
    await expect(creativeRow.locator('.cs-title')).toHaveText('Hanasui Cosmetics')
    await expect(creativeRow.locator('.cs-cnt')).toHaveText('1 / 6')

    await creativeRow.locator('button.cs-c.cs-side.cs-nx').click({ position: { x: 75, y: 20 } })
    await expect(creativeRow.locator('.cs-title')).toHaveText('Flame-Grilled Burger')

    await creativeRow.focus()
    await page.keyboard.press('ArrowLeft')
    await expect(creativeRow.locator('.cs-title')).toHaveText('Hanasui Cosmetics')

    // Clicking active center photo on row 2 opens creative modal
    await creativeRow.locator('button.cs-c.cs-mid').click()
    const dialog = page.locator('#creative-work [role="dialog"]')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('Hanasui Cosmetics')
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  })

  test('focus and blur at 1440px: center photo is sharp (opacity 1, filter none) and side photos are blurred & dimmed', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    for (const rowTestId of ['curve-row-digital', 'curve-row-creative']) {
      const row = page.getByTestId(rowTestId)
      const midStyle = await row.locator('.cs-c.cs-mid').evaluate((el) => {
        const s = window.getComputedStyle(el)
        return { opacity: s.opacity, filter: s.filter }
      })
      expect(midStyle.opacity).toBe('1')
      expect(midStyle.filter).toBe('none')

      for (const sideSelector of ['.cs-c.cs-side.cs-pl', '.cs-c.cs-side.cs-nx']) {
        const sideStyle = await row.locator(sideSelector).evaluate((el) => {
          const s = window.getComputedStyle(el)
          return { opacity: parseFloat(s.opacity), filter: s.filter }
        })
        expect(sideStyle.opacity).toBeLessThan(0.7)
        expect(sideStyle.filter).toContain('blur')
      }
    }
  })

  test('zero button overlap with center photo and >=44px tap targets at 1440px and 390px', async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(hasOverflow).toBe(false)

      for (const rowTestId of ['curve-row-digital', 'curve-row-creative']) {
        const row = page.getByTestId(rowTestId)
        await row.scrollIntoViewIfNeeded()

        const midBox = await row.locator('.cs-c.cs-mid').boundingBox()
        const plBtnBox = await row.locator('.cs-btn.cs-pl').boundingBox()
        const nxBtnBox = await row.locator('.cs-btn.cs-nx').boundingBox()

        expect(midBox).not.toBeNull()
        expect(plBtnBox).not.toBeNull()
        expect(nxBtnBox).not.toBeNull()

        expect(plBtnBox!.width).toBeGreaterThanOrEqual(44)
        expect(plBtnBox!.height).toBeGreaterThanOrEqual(44)
        expect(nxBtnBox!.width).toBeGreaterThanOrEqual(44)
        expect(nxBtnBox!.height).toBeGreaterThanOrEqual(44)

        const intersects = (
          a: NonNullable<typeof midBox>,
          b: NonNullable<typeof midBox>,
        ) =>
          a.x < b.x + b.width &&
          a.x + a.width > b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y

        expect(intersects(plBtnBox!, midBox!)).toBe(false)
        expect(intersects(nxBtnBox!, midBox!)).toBe(false)
      }
    }
  })

  test('phone layout (390px): side photos are at least 60px visible inside card, buttons sit in lower half of stage, and .cs-ln is never cut off in EN or ID', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const cardBox = await page.getByTestId('curve-showcase-card').boundingBox()
    expect(cardBox).not.toBeNull()

    for (const rowTestId of ['curve-row-digital', 'curve-row-creative']) {
      const row = page.getByTestId(rowTestId)
      const stageBox = await row.locator('.cs-stage').boundingBox()
      const plSideBox = await row.locator('.cs-c.cs-side.cs-pl').boundingBox()
      const nxSideBox = await row.locator('.cs-c.cs-side.cs-nx').boundingBox()
      const plBtnBox = await row.locator('.cs-btn.cs-pl').boundingBox()
      const nxBtnBox = await row.locator('.cs-btn.cs-nx').boundingBox()

      expect(stageBox).not.toBeNull()
      expect(plSideBox).not.toBeNull()
      expect(nxSideBox).not.toBeNull()
      expect(plBtnBox).not.toBeNull()
      expect(nxBtnBox).not.toBeNull()

      const visibleWidthInsideCard = (box: NonNullable<typeof plSideBox>) => {
        const left = Math.max(box.x, cardBox!.x)
        const right = Math.min(box.x + box.width, cardBox!.x + cardBox!.width)
        return Math.max(0, right - left)
      }

      expect(visibleWidthInsideCard(plSideBox!)).toBeGreaterThanOrEqual(60)
      expect(visibleWidthInsideCard(nxSideBox!)).toBeGreaterThanOrEqual(60)

      const stageMidY = stageBox!.y + stageBox!.height / 2
      expect(plBtnBox!.y + plBtnBox!.height / 2).toBeGreaterThan(stageMidY)
      expect(nxBtnBox!.y + nxBtnBox!.height / 2).toBeGreaterThan(stageMidY)
    }

    const assertNoCutOffLines = async () => {
      const lines = page.locator('#work .cs-ln')
      const count = await lines.count()
      expect(count).toBe(2)
      for (let i = 0; i < count; i++) {
        const metrics = await lines.nth(i).evaluate((el) => {
          const s = window.getComputedStyle(el)
          return {
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            textOverflow: s.textOverflow,
            whiteSpace: s.whiteSpace,
          }
        })
        expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1)
        expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight + 1)
        expect(
          metrics.textOverflow === 'ellipsis' && metrics.whiteSpace === 'nowrap',
        ).toBe(false)
      }
    }

    await assertNoCutOffLines()
    await page
      .locator('header button[aria-label="Switch language to Indonesian"]')
      .first()
      .click()
    await assertNoCutOffLines()
  })

  test('labels every project and concept piece honestly in EN and ID and loads zero <video> on initial load', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.locator('video')).toHaveCount(0)

    const work = page.locator('#work')
    const digitalBadge = work.getByTestId('curve-row-digital').locator('.cs-badge')
    const creativeBadge = work.getByTestId('curve-row-creative').locator('.cs-badge')

    await expect(digitalBadge).toHaveText('Self-initiated reference build · Live demo')
    await expect(creativeBadge).toHaveText(
      'Concept work · not commissioned by the brand',
    )
    await expect(work.getByText('Verified Live Product')).toHaveCount(0)

    await page
      .locator('header button[aria-label="Switch language to Indonesian"]')
      .first()
      .click()

    await expect(digitalBadge).toHaveText('Proyek referensi mandiri · Demo langsung')
    await expect(creativeBadge).toHaveText('Karya konsep · bukan pesanan resmi brand')
  })

  test('never renders TODO(yoga) placeholders', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('TODO(yoga)')).toHaveCount(0)
  })

  test('every project in the showcase links to a live deployment in #work-panel', async ({
    page,
  }) => {
    await page.goto('/')
    const work = page.locator('#work')
    const nextBtn = work.getByTestId('curve-row-digital').locator('button.cs-btn.cs-nx')

    for (let i = 0; i < 4; i++) {
      const link = work.locator('#work-panel a.link-sweep')
      await expect(link).toHaveCount(1)
      await expect(link).toHaveAttribute('href', /^https:\/\//)
      await nextBtn.click()
    }
  })

  test('clicking Digital Work and Creative Work nav links scrolls to #work and #creative-work', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'desktop primary nav link check')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    const nav = page.locator('header nav[aria-label="Primary"]')

    await nav.locator('a[href="#work"]').click()
    await expect
      .poll(async () => {
        const box = await page.locator('#work').boundingBox()
        return box ? Math.abs(box.y) : 9999
      })
      .toBeLessThan(200)

    await nav.locator('a[href="#creative-work"]').click()
    await expect
      .poll(async () => {
        const box = await page.locator('#creative-work').boundingBox()
        return box ? Math.abs(box.y) : 9999
      })
      .toBeLessThan(200)
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
