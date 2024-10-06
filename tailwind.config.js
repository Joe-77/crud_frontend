/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xmd: "860px",
        xs: "400px",
      },
    },
  },
  plugins: [],
};
