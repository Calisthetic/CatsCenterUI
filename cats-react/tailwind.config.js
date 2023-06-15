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
      maxHeight: {
        100: 'calc(100vh - 100px)'
      },
      spacing: {
        '128': '32rem',
        '144': '52rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      gridTemplateRows: {
        'checkCatsLG': '48px minmax(200px, 2fr) 52px',
        'checkCats': 'min-content minmax(200px, 2fr)',
      },
      gridTemplateColumns: {
        'checkCats': '67% 33%',
      }
    },
  },
  plugins: [],
}

