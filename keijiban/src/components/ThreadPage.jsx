import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export const ThreadPage = () => {
  const {thread_id} = useParams();
  const location = useLocation();
  const titleFromState = location.state?.title;
  const[posts, setPosts] = useState([]);

  useEffect(() =>{
    const fetchPosts = async() => {
      try{
        const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`);
        const data = await res.json();
        console.log("取得した data.posts:", data.posts); 
        setPosts(data.posts);

      }catch(error){
        console.error("投稿に失敗したよ。ごめんね:",error);
        alert("投稿に失敗したよ。もう1度投稿して(´;ω;｀)");
      }
    };
      fetchPosts();
    
  },[thread_id]);

  return(
   <div className="font-container">
      <h2 className="page-title">
        {titleFromState ??"読み込み中..."}
      </h2>
      {posts.length === 0 ? (
        <p>投稿がまだありません。</p>
      ) : (
        <ul className="thread-list">
          {posts.map((post) => (
            <li key={post.id} className="TP-response">
              {post.post}
            </li>
          ))}
        </ul>
      )}
    </div> 
  );
};