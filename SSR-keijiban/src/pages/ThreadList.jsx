import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ThreadList = (props) => {
  // SSR時はprops.threads、CSR時はuseEffectで取得
  const [threads, setThreads] = useState(props.threads || []);

  useEffect(() => {
    if (!props.threads) {
      fetch("https://railway.bulletinboard.techtrain.dev/threads")
        .then((res) => res.json())
        .then((data) => {
          setThreads(data);
        })
        .catch((error) => {
          console.log("スレッド取得エラー:", error);
        });
    }
  }, [props.threads]);

  return (
    <div>
      <h1 className="head">スレッド一覧</h1>
      <Link to="/threads/new" className="create-thread-button">
        + スレッドを作成(｀･ω･´)
      </Link>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id} className="thread-card">
            <Link to={`/threads/${thread.id}`} state={{ title: thread.title }}>
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
