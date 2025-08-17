/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Use BASE_PATH env for GitHub Pages project sites (e.g., /Portfolio-2025/)
const base = process.env.BASE_PATH || "/";

export default defineConfig({
  base,
  plugins: [react()],
});
