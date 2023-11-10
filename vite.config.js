import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   server: {
//     port: import.meta.env.VITE_APP_PORT,
//     proxy: {
//       "/api": `${import.meta.env.VITE_BACKEND_HOST}:${
//         import.meta.env.VITE_BACKEND_PORT
//       }`,
//     },
//   },
//   plugins: [react()],
// });
export default defineConfig({
  server: {
    port: 4000,
    proxy: {
      "/api": `http://localhost:5000`,
    },
  },
  plugins: [react()],
});
