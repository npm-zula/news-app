/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        bg: "#F7F7F7",
        accent_primary: "#333333",
        accent_secondary: "#393E46",
      },
      backgroundImage: {
        "news-bg": "url('./imgs/backgroundOne.jpg')",
        "profile-bg": "url('./imgs/backgroundTwo.jpg')",
      },
    },
  },
  plugins: [],
};
