// server/index.js
// NODE_ENVの値によってAppのimport先（src or dist）を自動で切り替えます。
// 例: 本番はnpm run start（NODE_ENV=production）、開発はnode server/index.js で自動切り替え。
// コマンドのNODE_ENVだけでimport先が変わるので、手動で書き換える必要はありません。

import express from "express";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";

let App;
async function loadApp() {
  if (process.env.NODE_ENV === "production") {
    App = (await import("../dist/src/App.server.js")).default;
  } else {
    App = (await import("../src/App.server.js")).default;
  }
}
await loadApp();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  // CSSファイルを読み込んでインラインで埋め込む
  const cssPath = path.join(__dirname, "../src/index.css");
  const css = fs.readFileSync(cssPath, "utf8");
  const appHtml = renderToString(React.createElement(App));
  // Hydrationなし: <script>タグを一切含めない
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR掲示板</title>
        <style>${css}</style>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <!-- クライアントJSは一切読み込まない（Hydrationなし） -->
      </body>
    </html>
  `;
  res.send(html);
});

const PORT = 5174;
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
