/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'dark',
 content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins:[require("daisyui")],
}



