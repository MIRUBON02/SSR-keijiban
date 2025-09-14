import React from "react";

export const ThreadListSSR = ({ threads }) => {
  return (
    <div>
      <h1 className="head">スレッド一覧</h1>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id} className="thread-card">
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
