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
          100: "#E6E6E6",
        },
        danger: {
          light: "#F97171",
          main: "#FC5050",
          dark: "#F63131",
        },
        "app-bg": "#F6F5FC",
      },
      boxShadow: {
        soft: "0px 4px 10px 0px #0000000A",
      },
    },
  },
  plugins: [],
};
