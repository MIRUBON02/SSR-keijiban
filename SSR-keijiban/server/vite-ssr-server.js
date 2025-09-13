import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { renderToString } from "react-dom/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
    appType: "custom",
  });
  app.use(vite.middlewares);

  app.get("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(
        url,
        `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSR掲示板</title>
    <link rel="stylesheet" href="/src/index.css" />
  </head>
  <body>
    <div id="root"><!--app-html--></div>
  </body>
</html>`
      );
      const { default: App } = await vite.ssrLoadModule(
        "/src/entry-server.jsx"
      );
      const appHtml = renderToString(await App());
      const html = template.replace(`<!--app-html-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(5174, () => {
    console.log("→ http://localhost:5174");
  });
}

createServer();
