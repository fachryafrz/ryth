/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#5772ff",
        },
      },
    },
  },
  plugins: [require("autoprefixer"), require("@tailwindcss/line-clamp")],
};
