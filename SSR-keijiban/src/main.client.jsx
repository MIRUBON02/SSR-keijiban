// src/main.client.jsx
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Router";
import "./index.css";

const rootEl = document.getElementById("root");
const app = (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

// SSR後は hydrateRoot、CSR時は createRoot
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
