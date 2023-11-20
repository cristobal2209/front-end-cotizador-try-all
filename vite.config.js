import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4000,
    proxy: {
      "/api": `https://quotemaster.homedns.org:5000`,
    },
  },
  plugins: [react()],
});
