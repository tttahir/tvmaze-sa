import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "API_URL");

  if (!env.API_URL) {
    throw new Error("API_URL must be set");
  }

  const apiUrl = new URL(env.API_URL);

  if (!["http:", "https:"].includes(apiUrl.protocol)) {
    throw new Error("API_URL must use HTTP or HTTPS");
  }

  return {
    plugins: [react()],
    define: {
      "import.meta.env.API_URL": JSON.stringify(env.API_URL),
    },
    server: {
      strictPort: true,
    },
    preview: {
      strictPort: true,
    },
    resolve: {
      tsconfigPaths: true,
    },
  };
});
