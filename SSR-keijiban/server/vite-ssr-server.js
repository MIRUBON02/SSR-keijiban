import express from "express";
import { createServer as createViteServer } from "vite";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";
import process from "process";

async function createServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === "production";
  let vite;
  let manifest;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // 本番用manifestを読み込み（.vite配下に修正）
    const manifestPath = path.resolve(
      process.cwd(),
      "dist/client/.vite/manifest.json"
    );
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    // 静的ファイル配信
    app.use(express.static(path.resolve(process.cwd(), "dist/client")));
  }

  app.get("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template;
      let appHtml;
      let preloadLinks = "";
      if (!isProd) {
        template = await vite.transformIndexHtml(
          url,
          `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR掲示板</title>
    <!-- ViteがCSSを自動で挿入 -->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.client.jsx"></script>
  </body>
</html>`
        );
        const { default: App } = await vite.ssrLoadModule(
          "/src/entry-server.jsx"
        );
        appHtml = renderToString(await App());
      } else {
        // 本番: テンプレートをdistから取得
        const templatePath = path.resolve(
          process.cwd(),
          "dist/client/index.html"
        );
        template = fs.readFileSync(templatePath, "utf-8");
        // SSRバンドルをrequire
        const { default: App } = await import(
          path.resolve(process.cwd(), "dist/client/entry-server.js")
        );
        appHtml = renderToString(await App());
        // manifestからCSSファイルを抽出
        const mainClient = manifest["src/main.client.jsx"];
        if (mainClient && mainClient.css) {
          preloadLinks = mainClient.css
            .map((href) => `<link rel="stylesheet" href="/${href}">`)
            .join("");
        }
      }
      let html = template.replace(`<!--app-html-->`, appHtml);
      if (isProd) {
        // </head>直前にCSSリンクを挿入
        html = html.replace("</head>", `${preloadLinks}</head>`);
      }
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (vite && vite.ssrFixStacktrace) vite.ssrFixStacktrace(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(5174, () => {
    console.log("→ http://localhost:5174");
  });
}

createServer();
