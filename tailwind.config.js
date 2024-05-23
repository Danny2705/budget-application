module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        poppins: "Poppins",
      },
      colors: {
        main: {
          lightPurple: "#D989E0",
          darkPurple: "#5F2A5E",
          lightPink: "#FE8499",
          darkPink: "#992189",
          neonPink: "#f910f9",
        },
        secondary: {
          blue: "#1f87df",
          red: "#d91c5c",
          orangeRed: "#f05a28",
          pink: "#d63384",
        },
      },
    },
  },
  plugins: [],
};
