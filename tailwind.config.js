/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html", './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#27467D",
        secondary: "#2C69CD",
        tertiary: "#009BB1",
        quaternary: "#7EAFFF",
        textlight: "#E6EFFF",
        textdark: "#2C2C2C",
        bgDark: "#344359",
      },
    },
  },
  plugins: [

  ],
});

