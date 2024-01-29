/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#000",
        "dark": "#252B4E",
        "dark-light": "#737373",
        "green": "#22C55E",
        "green-light": "#4ADE80",
        "gray-dark": "#414141",
        "gray": "#4A4654",
        "gray-light": "#EEF2F5",
        "gray7": "#77747F",
        "light": "#F4F3F4",
        "red": "#F63333",
      },
      fontFamily: {
        saira: ['saira', 'sans-serif'],
        montserrat: ['montserrat']
      }
    },
  },
  plugins: [],
}