/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E6F3FF",
          100: "#CCE7FF",
          200: "#99CFFF",
          300: "#66B7FF",
          400: "#339FFF",
          500: "#008CFF", // MakeMyTrip primary blue
          600: "#0070CC",
          700: "#005499",
          800: "#003866",
          900: "#001C33",
          950: "#000E1A",
        },
        accent: {
          orange: "#FF5722", // MakeMyTrip accent color
          yellow: "#FFC107", // For promotions/deals
        },
      },
      boxShadow: {
        card: "0 2px 8px 0 rgb(0 0 0 / 0.1)",
        hover: "0 8px 16px 0 rgb(0 0 0 / 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-card":
          "linear-gradient(to right bottom, rgb(0, 140, 255, 0.1), rgb(0, 140, 255, 0.05))",
      },
    },
  },
  plugins: [],
};
