import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      //"/api": "http://162.212.155.221:5000",
      "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
