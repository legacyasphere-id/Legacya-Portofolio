/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#080810',
        surface: '#0e0e1a',
        raised:  '#14141f',
        border:  '#1e1e2e',
        'border-light': '#252535',
        text:    '#e2e8f0',
        muted:   '#8892a4',
        dim:     '#4a5568',
        cyan:    '#22d3ee',
        'cyan-dim': '#0891b2',
        purple:  '#a78bfa',
        'purple-dim': '#7c3aed',
        green:   '#34d399',
        'green-dim': '#059669',
        accent:  '#B8956A',
        'accent-light': '#C9A97E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
