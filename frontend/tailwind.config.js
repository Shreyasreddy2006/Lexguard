/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF9',
        slate: '#1C1917',
        highRisk: {
          text: '#DC2626',
          bg: '#FEF2F2'
        },
        modRisk: {
          text: '#D97706',
          bg: '#FEF3C7'
        },
        safe: {
          text: '#16A34A',
          bg: '#DCFCE7'
        }
      }
    },
  },
  plugins: [],
}
