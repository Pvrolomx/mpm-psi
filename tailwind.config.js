/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#627362',
          600: '#4d5b4d',
          700: '#404a40',
          800: '#363d36',
          900: '#2f342f',
        },
        cream: {
          50: '#fdfcfa',
          100: '#f9f6f0',
          200: '#f3ede0',
          300: '#e9dfc8',
          400: '#dccba8',
          500: '#cdb58a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
