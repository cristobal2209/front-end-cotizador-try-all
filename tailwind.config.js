/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   one: "#424140",
      //   oneHover: "#31302f",
      //   two: "#69A1AB",
      //   twoHover: "#528189",
      //   three: "#2C2C2C",
      //   threeHover: "#bababa",
      //   four: "#69A1AB",
      //   fourHover: "#528189",
      //   light: "#E6EFFF",
      //   dark: "#2C2C2C",
      //   dark2: "#424242",
      //   dark3: "#212121",
      // },
      colors: {
        one: "#212121",
        oneHover: "#2C2C2C",
        two: "#69A1AB",
        twoHover: "#528189",
        three: "#424140",
        threeHover: "#31302f",
        four: "#69A1AB",
        fourHover: "#528189",
        light: "#E6EFFF",
        dark: "#2C2C2C",
        dark2: "#424242",
        dark3: "#212121",
      },
    },
  },
  plugins: [],
});
