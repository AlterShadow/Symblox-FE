const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: {
          min: "0px",
          max: "767px",
        },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        md: {
          min: "768px",
          max: "1023px",
        },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        lg: {
          min: "1024px",
          max: "1200px",
        },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xl: {
          min: "1201px",
          max: "1400px",
        },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        "2xl": {
          min: "1401px",
          max: "1600px",
        },
        // => @media (min-width: 1536px) { ... }
        "3xl": {
          min: "1601px",
        },
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
