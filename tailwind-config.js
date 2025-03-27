/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alien-green': '#2E8B57',
        'misty-gray': '#708090',
        'golden-light': '#FFD700'
      },
      backgroundImage: {
        'alien-landscape': 'linear-gradient(to bottom, #000428, #004e92)'
      }
    },
  },
  plugins: [],
}