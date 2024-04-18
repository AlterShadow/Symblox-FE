const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'delay-[200ms]',
    'delay-[400ms]',
    'delay-[600ms]',
    'delay-[800ms]',
    'delay-[1000ms]',
    'delay-[1200ms]',
  ],
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
        primaryBoxColor: "#17283B",
        primaryButtonColor: "#EE2D82",
        secondaryText: "#7F93A2",
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
