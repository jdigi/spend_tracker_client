import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["./**/*.test.tsx"],
    globals: true,
    coverage: {
      all: true,
      include: ["src/**/*.tsx"],
    },
  },
});
