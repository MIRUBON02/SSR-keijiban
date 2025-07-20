import { Routes,Route } from "react-router-dom";
import { ThreadList } from "./components/ThreadList";
import { NewThread } from "./components/NewThread";
import { ThreadPage } from "./components/ThreadPage";

export const App = () => {
  return(
    <Routes>
      <Route path="/" element={<ThreadList />}/>
      <Route path="/threads/new" element={<NewThread />}/>
      <Route path="threads/:thread_id" element={<ThreadPage />}/>
    </Routes>
  );
};
