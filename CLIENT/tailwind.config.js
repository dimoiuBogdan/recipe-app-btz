/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "btz-blue": "#364F6B",
        "btz-teal": "#3FC1C9",
        "btz-gray": "#F5F5F5",
        "btz-pink": "#FC5185",
      },
    },
  },
  plugins: [],
};
