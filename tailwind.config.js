const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primaryBackground: "#08131E",
        primaryText: "#C3E6FF",
        secondaryText: "#7F93A2",
        primaryBoxColor: "#17283B",
        primaryButtonColor: "#EE2D82",
      },
      fontFamily: {
        Barlow: ["Barlow", "sans-serif"],
      },
      boxShadow: {
        primary: "0px 0px 0px 2px rgba(238, 45, 130, 0.30)",
      },
    },
  },
  plugins: [],
};
