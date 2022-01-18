module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    base: false,

    themes: [
      {
        mytheme: {
          primary: "#ea5234",
          "primary-focus": "#d43616",
          "primary-content": "#ffffff",
        },
      },
    ],
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
