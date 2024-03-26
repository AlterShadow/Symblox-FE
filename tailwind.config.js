const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#08131E",
        primaryText: "#C3E6FF",
        primaryButtonColor: "#EE2D82",
      },
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
