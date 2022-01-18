module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    styled: false,
  },
  theme: {
    extend: {
      colors: {
        backgroundColor: "#FFFDF9",
        textBackgroundColor: "#CCCDC9",
        textColor: "#06B49A",
        dotColor: "#06B49A",
        borderColor: "#AFDBD2",
      },
    },
  },
};
