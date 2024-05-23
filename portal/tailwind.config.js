module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "420px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    colors: {
      primary: "#55FEC3",
      primaryLight: "#CDE4BA",
      primarySupport: "#141718",
      secondarySupport: "#232627",
      tertiarySupport: "#8FB996",
      text: "#252525",
      border: "#E7E7E9",
      error: "#C35865",
      success: "#58C383",
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      default: ["Mundial", "sans-serif"],
    },
    easing: {
      default: "cubic-bezier(0.65, 0, 0.35, 1)",
    },
    shadows: {
      default: "0px 2px 75px 0px rgba(37, 37, 37, 0.10);",
    },
    extend: {},
  },
  plugins: [],
}
