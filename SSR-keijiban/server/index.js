// server/index.js

import express from "express";
import fetch from "node-fetch";
globalThis.fetch = fetch;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

<<<<<<< Updated upstream
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
=======
// 静的ファイル（dist/client, public）を絶対パスで配信
const clientDir = path.resolve(__dirname, "../../client");
app.use(express.static(clientDir));
app.use(express.static(path.resolve(__dirname, "../../public")));

// SSRでHTMLを返す
app.get("/", async (req, res) => {
  const AppComponent = await App();
  const appHtml = renderToString(AppComponent);
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR掲示板</title>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
  `;
  res.status(200).send(html);
});

const PORT = 5174;
>>>>>>> Stashed changes
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
