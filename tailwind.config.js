/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
