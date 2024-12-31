/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['Caveat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
