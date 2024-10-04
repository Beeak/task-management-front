/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dgreen": "#3C3D37",
        "dgreen-light": "#5B6457",
        "dgreen-lighter": "#697565",
        "bgreen": "#333330",

        "green-dark": "#2F422C",
        "blue-light": "#43C9E4",
        "blue-dark": "#2A616C",
        "orange-dark": "#B17300",
        "orange-light": "#FFA500",
        "red-dark": "#BF251C",
        "red-light": "#FF746C"
      }
    },
  },
  plugins: [],
}

