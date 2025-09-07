import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";
import "./index.css";
import { AppRoutes } from "./Router";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}
