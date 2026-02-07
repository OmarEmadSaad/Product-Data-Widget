import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",

    lib: {
      entry: "src/widget-main.jsx",
      name: "TactfulWidget",
      fileName: () => "Widget.js",
      formats: ["iife"],
    },

    cssCodeSplit: false,

    rollupOptions: {
      output: {
        assetFileNames: "Widget.css",
      },
    },
  },
});
