import { Routes, Route } from "react-router-dom";
import { ThreadList } from "./pages/ThreadList";
import { NewThread } from "./pages/NewThread";
import { ThreadPage } from "./pages/ThreadPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ThreadList />} />
      <Route path="/threads/new" element={<NewThread />} />
      <Route path="/threads/:thread_id" element={<ThreadPage />} />
    </Routes>
  );
};
