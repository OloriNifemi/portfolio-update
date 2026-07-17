export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        ink: "#111111",
        muted: "#666666",
        hairline: "#EAEAEA",
      },
    },
  },
  plugins: [],
};