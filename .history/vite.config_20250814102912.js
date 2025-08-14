import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          i18n: ["i18next", "react-i18next", "i18next-http-backend"],
          utils: ["lodash", "axios", "yup", "formik"],
        },
      },
    },
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
});
