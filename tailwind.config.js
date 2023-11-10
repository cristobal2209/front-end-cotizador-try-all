/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#27467D",
        oneHover: "#324d7b",
        two: "#1D50A8",
        twoHover: "#2b5aab",
        three: "#2A74F5",
        threeHover: "#3675e2",
        four: "#619DFF",
        fourHover: "#6ea3f7",
        light: "#E6EFFF",
        dark: "#2C2C2C",
        dark2: "#424242",
        dark3: "#212121",
      },
    },
  },
  plugins: [],
});
