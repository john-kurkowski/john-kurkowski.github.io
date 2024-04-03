/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FBF9EB',
        primary: '#E0992C',
        secondary: '#1E4A79',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [],
}
