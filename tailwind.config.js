/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require("tailwindcss/plugin");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, #00000083, transparent)",
        "gradient-push": "linear-gradient(225deg, #e03dc1, #8247E5)",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".gradient-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
});
