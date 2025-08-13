import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // فصل المكتبات الكبيرة في ملفات مستقلة
          react: ["react", "react-dom"],
          vendor: ["@tanstack/react-query", "react-router-dom", "zod", "axios", "recharts"],
        },
      },
    },
  },
});