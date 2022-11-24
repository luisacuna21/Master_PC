/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../frontend/*.{html,js}"],
  // content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
