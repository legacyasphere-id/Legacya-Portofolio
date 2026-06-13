/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Surfaces — cream / human operations ──────────────────────────
        bg:      '#F5F0E8', // primary page canvas
        surface: '#FAF7F2', // cards, elevated content
        raised:  '#F0EADF', // subtle elevation / image placeholders

        // ── Text ─────────────────────────────────────────────────────────
        text:    '#181818', // headlines & primary content
        muted:   '#66625D', // descriptions, supporting copy
        dim:     '#9A958C', // metadata, faint labels

        // ── Lines ────────────────────────────────────────────────────────
        border:  '#E5DDD0', // dividers, cards, inputs

        // ── Blue / systems & intelligence ────────────────────────────────
        blue:        '#5E7EBE', // primary accent — highlights, links
        'blue-deep': '#2F4F7F', // authority — buttons, key actions
        'blue-dark': '#26416B', // hover for deep blue
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
