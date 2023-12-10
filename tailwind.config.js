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
      'fg': '#231f20',
      'bg': '#fdfdf7',
      'gray': {
        '0': '#ffffff',
        '25': "#fefefb",
        '50': '#fdfdf7',
        '100': '#f7f7f0',
        '200': '#e1e1dc',
        '300': '#c5c5c1',
        '400': '#aaaaa5',
        '500': '#72726f',
        '600': '#565654',
        '700': '#3a3a39',
        '800': '#1e1e1e',
        '900': '#030302',
        '1000': '#000000'
      },
      'brand': {
        '50': '#fffdea',
        '100': '#fff8c5',
        '200': "#fff185",
        '300': "#ffe346",
        '400': "#ffd21b",
        '500': '#f4a900',
        '600': '#e28700',
        '700': "#bb5e02",
        '900': "#7c3b0b",
        '950': "#381e00"
      },
      'blue': '#1d64cc',
      'green': '#377765',
      'orange': '#f49b7f',
      'purple': '#A89BE5',
      'purple-light': '#bbadff',
      'red': '#DA2C38',
      'pink-light': '#faf0f5',
    },
    listStyleType: {
      katakana: 'katakana',
    },
    extend: {},
  },
  plugins: [ ],
}
