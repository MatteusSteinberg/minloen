module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'selector',
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
      darkPrimaryLight: "#CDE4BA",
      darkPrimarySupport: "#141718",
      darkSecondarySupport: "#232627",
      darkBorder: "rgba(231, 231, 233, 0.2)",

      text: "#252525",
      error: "#C35865",
      success: "#58C383",
      white: "#FFFFFF",
      black: "#000000",

      lightPrimary: "#005445",
      lightPrimaryLight: "#FF9DCE",
      lightSecondary: "#F5F7F3",
      lightSecondaryLight: "#74EAA3",
      lightBorder: "#E0E0E0",
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
    keyframes: {
      inAnimation: {
        "0%": {
          opacity: "0",
          transform: "translateY(50px)",
          visibility: "hidden"
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
          visibility: "visible"
        }
      },
      outAnimation: {
        "0%": {
          opacity: "1",
          transform: "translateY(0px)",
          visibility: "visible"
        },
        "100%": {
          opacity: "0",
          transform: "translateY(50)",
          visibility: "hidden"
        }
      },

    },
    extend: {

      colors: {
        "light-start": '#005445',
        'light-end': '#005445',
        'dark-start': '#CDE4BA',
        'dark-end': '#CDE4BA',
      },
      animation: {
        inAnimation: "inAnimation 500ms cubic-bezier(0.77, 0.2, 0.05, 1)",
        outAnimation: "outAnimation 500ms cubic-bezier(0.77, 0.2, 0.05, 1)",
      },
    },
  },
  plugins: [],
}
