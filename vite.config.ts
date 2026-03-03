import { defineConfig } from "vitest/config"; // Меняем источник defineConfig
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Чтобы не импортировать 'describe' и 'it' каждый раз
    environment: "jsdom", // Имитация браузера в Node.js
    setupFiles: "./setupTests.ts", // Файл с настройками (создадим следующим шагом)
  },
});
