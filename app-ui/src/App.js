import "./App.css";
import React from "react";
import LandingPage from "./pages/Landing/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-reg/LoginPage";
import SignupPage from "./pages/login-reg/SignupPage";
import NewsPage from "./pages/news/NewsPage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <LandingPage />; */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
