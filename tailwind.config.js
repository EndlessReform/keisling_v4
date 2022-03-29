const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Basier Circle', 'system-ui'],
      mono: ['Basier Circle Mono', 'Courier New'],
    },
    colors: {
      'blue': '#1d64cc',
      'green': '#377765',
      'orange': '#f49b7f',
      'purple': '#A89BE5',
      'purple-light': '#bbadff',
      'red': '#DA2C38',
      'yellow': '#F8E16C',
      'fg': '#231f20',
      'bg': '#fcfcf6',
      'gray-md': '#75787d',
      'gray': '#696C70',
      'pink-light': '#faf0f5',
    },
    listStyleType: {
      katakana: 'katakana',
    },
    extend: {},
  },
  plugins: [ ],
}
