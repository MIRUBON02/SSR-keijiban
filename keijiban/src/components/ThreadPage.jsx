import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export const ThreadPage = () => {
  const {thread_id} = useParams();
  const location = useLocation();
  const titleFromState = location.state?.title;
  const[posts, setPosts] = useState([]);
  const[newPost, setNewPost] = useState("");

  const fetchPosts = async() => {
      try{
        const res = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`);
        const data = await res.json();
        setPosts(data.posts);

      }catch(error){
        console.error("投稿の取得失敗:",error);
        alert("投稿の取得に失敗したよ。ごめんね(´;ω;｀)");
      }
    };
   
  useEffect(()=>{
    fetchPosts();
  },[thread_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!newPost.trim()){
        alert("投稿内容を入力してね('ω')");
        return;
    }
     try{
    await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            threadId: thread_id,
            post: newPost
        })
    });

    setNewPost("");
    fetchPosts();
  }catch(error){
    alert("投稿に失敗したよ(´；ω；｀)");
    console.error(error);
  }
};

  return(
   <div className="font-container">
      <h2 className="page-title">
        {titleFromState ??"読み込み中..."}
      </h2>

      {/* 投稿一覧 */}
      <div className="thread-body">
        <div className="post-list">
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
        


      {/* 投稿フォーム */}
        <form onSubmit={handleSubmit} className="TP-form">
         <p className="form-title">コメントしてみよう！</p>
         <input
           type="text"
           value={newPost}
           onChange={(e)=>setNewPost(e.target.value)}
           placeholder="コメントを入力"
           className="TP-input"
         />
         <button type="submit" className="TP-post-button">投稿( •̀ ω •́ )y</button>
        </form>
      </div>
    </div> 
  );
};