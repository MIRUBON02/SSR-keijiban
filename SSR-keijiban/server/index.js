// server/index.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 静的ファイル（public）を配信
const isBuild = __dirname.includes("dist");
const outDir = isBuild
  ? path.join(__dirname, "../client") // ← dist/server/index.js から dist/client への相対パス
  : path.join(__dirname, "../../dist/client"); // ← 開発時
app.use(express.static(outDir));
// ルートでindex.htmlを返す
app.get("/", (req, res) => {
  res.sendFile(path.join(outDir, "index.html"));
});
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
