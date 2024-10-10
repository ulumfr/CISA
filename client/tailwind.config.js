/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#043F2D",
        second: "#FDCD15",
        button: "#F2673F",

        abu: "#939393",
        abugelap: "#465467",

        hitamcustom: "#222831",
      },
    },
  },
  plugins: [],
};
