/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      'lightgray-white': '#f8f6f5',
      'lightgray': '#edeceb',
      'orange': colors.orange,
      'green': colors.green,
      'red': colors.red,
      'blue': colors.blue,
      'white': colors.white,
      'gray': colors.gray,
      'black': colors.black
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

