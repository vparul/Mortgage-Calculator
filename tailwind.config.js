/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
console.log(defaultTheme);

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          100: "hsl(202, 86%, 94%)",
          300: "hsl(203, 41%, 72%)",
          500: "hsl(200, 26%, 54%)",
          700: "hsl(200, 24%, 40%)",
          900: "hsl(202, 55%, 16%)",
        },
        lime: {
          100: "hsl(60,70.6%,93.3%)",
          500:"hsl(61, 70%, 52%)"},
        red: "hsl(4, 69%, 50%)",
        white: "hsl(0, 0%, 100%)",
        ...defaultTheme.colors,
      },
      fontFamily: {
        sans: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
      },
      width: {
        "48": "48%"
      }
    },
  },
  plugins: [],
}
