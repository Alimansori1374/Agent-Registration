/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      customBlue:"#2F9199",
      customWhite:"#FFFFFF",
      customRed:"#FF0000",
      customGray:"#D3D3D3",
      textGray:"#808080",
    },
    extend: {

    },
  },
  plugins: [],
}