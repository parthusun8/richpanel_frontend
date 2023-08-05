/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'box-blue-color' : 'rgb(31, 77, 145)',
        'box-light-blue-color' : 'rgb(121, 148, 189)'
      }
    },
  },
  plugins: [],
}

