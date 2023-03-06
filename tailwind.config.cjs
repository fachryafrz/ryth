/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        image: "2 / 3",
      },
      colors: {
        primary: {
          blue: "#5772ff",
        },
      },
    },
  },
  plugins: [require("autoprefixer"), require("@tailwindcss/line-clamp")],
};
