import { useEffect, useState } from "react";

export const App = () => {
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
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id} className="thread-card">
            {thread.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
