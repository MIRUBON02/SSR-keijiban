import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true, // ← これを有効に
    publicDir: "public", // ← ルートからの相対パス
    outDir: "dist/client", // ← サーバーが配信しやすい出力先
    emptyOutDir: false, // SSR/Node成果物と共存するので false
    rollupOptions: {
      input: {
        main: "index.html", // これでindex.htmlからmain.client.jsxが辿れる
      },
    },
  },
});
