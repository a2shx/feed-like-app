/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '375px' }, // Define xs for screens smaller than 375px
      },
    },
  },
  plugins: [],
};