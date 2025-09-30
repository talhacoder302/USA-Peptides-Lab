// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #4f46e5, #ec4899)",
      },
      colors: {
        primary: "#B31942",
        secondary: "#093161",
      },
    },
  },
  plugins: [],
};
