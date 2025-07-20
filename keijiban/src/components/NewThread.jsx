import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewThread = () => {
    const[title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if(!title.trim()){
            alert("タイトルを入力してね");
            return;
        }
      await fetch("https://railway.bulletinboard.techtrain.dev/threads",{
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({title}),
    });

    navigate("/");
    };

    return(
      <div className="font-container">
        <h2 className="page-title">スレッドを新規作成</h2>
        <div className="NT-form-row">
          <input
            type="text"
            placeholder="スレッドタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="NT-input-title"
            />
          <button onClick={handleSubmit} className="NT-create-button">作成</button>
        </div>
      </div> 
    );
};