
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%' : {opacity : '0' , width : '90%' },
          '100%' : {opacity : '1' , width : '100%'}
        },
      },
      animation: {
        'waving-hand': 'wave 0.5s linear ',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
    // ...
  ],
}