import "./App.css";
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-reg/LoginPage";
import SignupPage from "./pages/login-reg/SignupPage";
import NewsPage from "./pages/news/NewsPage";
import SuperAdmin from "./pages/community-panel/superadmin";
import User from "./pages/community-panel/user"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <LandingPage />; */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/news" element={<NewsPage></NewsPage>} />
        <Route path="/superadmin" element={<SuperAdmin></SuperAdmin>} />
        <Route path="/community" element={<User></User>} />
        
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
