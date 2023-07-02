/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: "#E0E3FF",
          light: "#6674F4",
          main: "#5061FC",
          dark: "#3346F0",
        },
        gray: {
          900: "#222222",
          200: "#BCBCBC",
        },
        "app-bg": "#F6F5FC",
      },
    },
  },
  plugins: [],
};
