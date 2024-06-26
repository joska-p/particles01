import { defineConfig } from "vite"

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts}"],
      provider: "istanbul",
    },
    include: ["tests/**/*.{js,ts}"],
    browser: {
      enabled: true,
      name: "firefox",
      headless: true,
    },
  },
})
