/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#F7F4ED',
        surface: '#FAF8F2',
        raised:  '#EDE6D6',
        border:  '#E6DFD0',
        'border-light': '#D6CDB9',
        text:    '#1C1A17',
        muted:   '#8A847A',
        dim:     '#B5AFA4',
        // Primary accent — gold
        cyan:    '#B8956A',
        'cyan-dim': '#9A7A52',
        accent:  '#B8956A',
        'accent-light': '#D6BC95',
        // Secondary accent — sage
        purple:  '#7A8B6A',
        'purple-dim': '#5C6E52',
        // Success / active — forest
        green:   '#5A8A6A',
        'green-dim': '#3D6B4D',
        // Navy — drawn from the background texture (cream/blue system)
        navy:      '#33475B',
        'navy-deep': '#26384A',
        'navy-soft': '#5A7088',
        // Dark surface for manifesto-style sections
        ink:     '#1C1A17',
        'ink-deep': '#13110F',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
