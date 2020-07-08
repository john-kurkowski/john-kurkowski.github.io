const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        background: '#FBF9EB',
        primary: '#E0992C',
        secondary: '#1E4A79'
      },
      fontFamily: {
        sans: ['Varela Round', ...defaultTheme.fontFamily.sans],
        serif: ['Lora', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  variants: {},
  plugins: []
}
