import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    publicDir: "public", // ← ルートからの相対パス
    outDir: "dist/client", // ← サーバーが配信しやすい出力先
    emptyOutDir: false, // SSR/Node成果物と共存するので false
  },
});
