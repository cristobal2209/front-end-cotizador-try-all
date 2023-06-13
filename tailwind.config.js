/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html", './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        whiteHover: "#F3F8FF",
        primary: "#27467D",
        primaryHover: "#39517d",
        secondary: "#2C69CD",
        secondaryHover: "#4177cf",
        tertiary: "#009BB1",
        quaternary: "#7EAFFF",
        quaternaryHover: "#619DFF",
        textlight: "#E6EFFF",
        textdark: "#2C2C2C",
        bgDark: "#344359",
      },
    },
  },
  plugins: [

  ],
});

