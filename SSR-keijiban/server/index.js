// server/index.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../../src/App.server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 静的ファイル（dist/client, public）を絶対パスで配信
const clientDir = path.resolve(__dirname, "../../client");
app.use(express.static(clientDir));
app.use(express.static(path.resolve(__dirname, "../../public")));

// SSRでHTMLを返す
app.get("/", (req, res) => {
  const appHtml = renderToString(React.createElement(App));
  const cssPath = "/assets/index-DBB5uGS5.css";
  const html = `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR掲示板</title>
        <link rel="stylesheet" href="${cssPath}" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
  `;
  res.status(200).send(html);
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
