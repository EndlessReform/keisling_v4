const plugin = require('tailwindcss/plugin')

module.exports = {
  presets: [require('./lib/tw-brand-preset.js')],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-mona)'],
      serif: ['var(--font-newsreader)'],
      mono: ['var(--font-plex-mono)'],
    },
    listStyleType: {
      katakana: 'katakana',
    },
    extend: {},
  },
  plugins: [],
}
