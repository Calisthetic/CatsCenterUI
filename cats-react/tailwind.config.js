/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Main': '#FABC34',
      },
      height: {
        100: '500px'
      },
      spacing: {
        '128': '32rem',
        '144': '52rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateRows: {
        'checkCats': '48px minmax(200px, 2fr) 52px',
      }
    },
  },
  plugins: [],
}

