const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['src/**/*.{js,md,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#FBF9EB',
        primary: '#E0992C',
        secondary: '#1E4A79'
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  variants: {},
  plugins: []
}
