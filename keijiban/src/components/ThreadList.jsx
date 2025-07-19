import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

export const ThreadList = () => {
    const[threads, setThreads] = useState([]);
 
 useEffect(()=>{
  fetch('https://railway.bulletinboard.techtrain.dev/threads')
  .then(res => res.json())
  .then(data => {
     console.log(data);
     setThreads(data)})
  

  .catch(error => {
  console.log('スレッド取得エラー:', error);
 });

},[]);

return(
   <div>
      <h1 className="head">スレッド一覧</h1>
      <Link to="/threads/new">
       <button>+ スレッドを作成</button>
      </Link>
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