import React from "react";
import { ThreadList } from "./pages/ThreadList";
import { Counter } from "./pages/Counter";

export default function App() {
  return (
    <div className="container">
      <Counter />
      <ThreadList />
    </div>
  );
}
