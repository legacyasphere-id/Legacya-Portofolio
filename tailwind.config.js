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
        // Primary accent — gold (was cyan)
        cyan:    '#B8956A',
        'cyan-dim': '#9A7A52',
        // Secondary accent — sage (was purple)
        purple:  '#7A8B6A',
        'purple-dim': '#5C6E52',
        // Success / active — forest (was green)
        green:   '#5A8A6A',
        'green-dim': '#3D6B4D',
        // Legacy accent
        accent:  '#B8956A',
        'accent-light': '#D6BC95',
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
