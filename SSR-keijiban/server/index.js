// server/index.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// dist/client配下を静的配信
const clientDir = path.join(__dirname, "../client");
app.use(express.static(clientDir));
app.get("/", (req, res) => {
  res.sendFile(path.join(clientDir, "index.html"));
});
const PORT = 5174;
app.listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
