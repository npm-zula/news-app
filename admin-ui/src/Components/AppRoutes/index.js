import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users/user.js";
import Dashboard from "../../Pages/Dashbaord";
import Comments from "../../Pages/Comments/comment.js";
import ArticlesApproval from "../../Pages/Articles/article.js";
import Forums from "../../Pages/Forums/forum.js";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/comments" element={<Comments />}></Route>
      <Route path="/articles" element={<ArticlesApproval />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/forums" element={<Forums />}></Route>
    </Routes>
  );
}
export default AppRoutes;
