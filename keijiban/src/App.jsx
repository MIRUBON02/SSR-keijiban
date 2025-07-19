import { Routes,Route } from "react-router-dom";
import { ThreadList } from "./components/ThreadList";
import { NewThread } from "./components/NewThread";

export const App = () => {
  return(
    <Routes>
      <Route path="/" element={<ThreadList />}/>
      <Route path="/threads/new" element={<NewThread />}/>
    </Routes>
  );
};
