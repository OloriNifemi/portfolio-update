 /** @type {import('tailwindcss').Config} */
export default {
   content:[
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}"
   ], 
   
   theme: {
     extend: {
      fontFamily: {
        akira: [ "akira" ],
        montSerrat: ["Montserrat", "sans-serif" ],
        manRope: ["Manrope","sans-serif" ],
        merriWeather: ["Merriweather", "serif"],
      },
     },
   },
   plugins: [],
 }