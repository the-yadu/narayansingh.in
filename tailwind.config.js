/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./public/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#f000b8",
        accent: "#1dcdbc",
        neutral: "#2b3440",
        dark: "#1f2937",
        light: "#f8f9fa",
      },
    },
  },
  plugins: [],
};
