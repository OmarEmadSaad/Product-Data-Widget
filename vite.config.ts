// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/widget-main.jsx",
      name: "TactfulWidget",
      fileName: "Widget",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "Widget.css",
      },
    },
  },
});
