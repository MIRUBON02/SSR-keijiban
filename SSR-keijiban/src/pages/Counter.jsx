import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ margin: "24px 0" }}>
      <span>カウンター: {count} </span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}
