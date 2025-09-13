import React from "react";
import { ThreadList } from "./pages/ThreadList";
import { Counter } from "./pages/Counter";
import { StaticRouter } from "react-router-dom/server";

export default async function App() {
  // SSR用: サーバーでスレッド一覧を取得
  const res = await fetch(
    "https://railway.bulletinboard.techtrain.dev/threads"
  );
  const threads = await res.json();
  // SSR時はStaticRouterでラップ
  return (
    <StaticRouter location="/">
      <Counter />
      <ThreadList threads={threads} />
    </StaticRouter>
  );
}
