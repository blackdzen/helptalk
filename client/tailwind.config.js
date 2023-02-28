module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      blue: "#2b87ea",
      "dark-forest": "#204c57",
      "dark-grey": "#9b9aa5",
      grey: "#e5e7eb",
      "light-wall": "#82969f",
      white: "#ffffff",
      "rich-black": "#061826",
      corn: "#F5E960",
      "dark-orchid": "#A42CD6",
    },
    extend: {
      fontFamily: {
        JetBrains: ["JetBrains Mono"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
